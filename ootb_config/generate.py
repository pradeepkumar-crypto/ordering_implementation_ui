#!/usr/bin/env python3
"""
Rebuilds dock-board.html (the OOTB artifact) from the CSVs in this folder.

Usage:
    python3 generate.py

Edit any of these CSVs, then re-run this script. It reads:
    tasks.csv                - every task/table: name, order, group, type,
                                usage, exec_deps, masters, vague, note
    external_dependencies.csv - tables referenced as a dependency that are
                                NOT tasks themselves (Master/Derived/Backsync/
                                AnR/ADA classification for the drawer)
    types.csv                - the task-type taxonomy (label, color, owning team)
    teams.csv                - team labels/colors
    categories.csv           - the 5 drawer sections (Master/Derived/...)
    nav_sections.csv         - sidebar sections, INCLUDING "coming soon" ones.
                                Add a new row with status=soon to add a whole
                                new coming-soon section with no code changes.
    schemas.csv               - column-level schema per table (table_name,
                                column_name, data_type, key, description,
                                order), rendered on the Schemas page.
    queries.csv               - the build query for each table (table_name,
                                step, label, query, notes), rendered on the
                                Build Queries page. `query` may reference
                                {Project ID} and {Dataset} (asked once,
                                globally) plus any table-specific {Param
                                Name} declared for that table in
                                query_params.csv.
    query_params.csv         - table-specific query parameters (table_name,
                                param_key, label, default, description) —
                                param_key must match a {param_key} placeholder
                                used in that table's query in queries.csv.
    postgres_push.csv        - the subset of tables also pushed from GBQ to
                                PostgreSQL (Table Name, Schema, Type, Table
                                DDL, View DDL). Type is 'Direct' (push as-is)
                                or 'Version' (a *_version table plus a view
                                that reads the current version), rendered on
                                the Schemas page.
and writes the finished HTML to ../dock-board.html (next to this folder),
using template.html as the structural skeleton.

Validates as it goes: unknown types, unknown icons, dependencies that point
nowhere, and same-group dependency conflicts (a task scheduled in parallel
with something it actually depends on) are all reported before the file is
written, mirroring the checks this data set has been through by hand.
"""
import csv
import json
import os
import re
import subprocess
import sys

BASE = os.path.dirname(os.path.abspath(__file__))
OUT_PATH = os.path.join(os.path.dirname(BASE), "dock-board.html")
TEMPLATE_PATH = os.path.join(BASE, "template.html")

ICON_PATHS = {
    "checklist": '<rect x="3.4" y="4" width="3" height="3" rx="0.6"/><path d="M9 5.5h7.4"/><rect x="3.4" y="8.5" width="3" height="3" rx="0.6"/><path d="M9 10h7.4"/><rect x="3.4" y="13" width="3" height="3" rx="0.6"/><path d="M9 14.5h7.4"/>',
    "database": '<ellipse cx="10" cy="5" rx="6" ry="2.1"/><path d="M4 5v4.5c0 1.16 2.7 2.1 6 2.1s6-.94 6-2.1V5"/><path d="M4 9.5V14c0 1.16 2.7 2.1 6 2.1s6-.94 6-2.1V9.5"/>',
    "layers": '<path d="M10 3l7 3.5-7 3.5-7-3.5L10 3z"/><path d="M3 10.5l7 3.5 7-3.5"/><path d="M3 14l7 3.5 7-3.5"/>',
    "code": '<path d="M7 6l-4 4 4 4"/><path d="M13 6l4 4-4 4"/>',
    "map": '<rect x="3" y="3" width="6" height="6" rx="1"/><rect x="11" y="3" width="6" height="6" rx="1"/><rect x="3" y="11" width="6" height="6" rx="1"/><rect x="11" y="11" width="6" height="6" rx="1"/><path d="M9 6h2M9 14h2M6 9v2M14 9v2"/>',
}

GLOBAL_QUERY_PARAMS = ("Project ID", "Dataset")
PLAUSIBLE_TOKEN_RE = re.compile(r"\{([A-Za-z][A-Za-z0-9 /]{0,40})\}")

errors = []
warnings = []


def err(msg):
    errors.append(msg)


def warn(msg):
    warnings.append(msg)


def read_csv(name):
    path = os.path.join(BASE, name)
    # utf-8-sig transparently strips a leading BOM (some of these CSVs are
    # exported from Excel/Sheets on Windows) and is otherwise identical to utf-8.
    with open(path, newline="", encoding="utf-8-sig") as f:
        return list(csv.DictReader(f))


def split_list(s):
    return [x.strip() for x in (s or "").split(";") if x.strip()]


def main():
    tasks_raw = read_csv("tasks.csv")
    ext_raw = read_csv("external_dependencies.csv")
    types_raw = read_csv("types.csv")
    teams_raw = read_csv("teams.csv")
    categories_raw = read_csv("categories.csv")
    nav_raw = read_csv("nav_sections.csv")
    schemas_raw = read_csv("schemas.csv")
    queries_raw = read_csv("queries.csv")
    query_params_raw = read_csv("query_params.csv")
    pg_push_raw = read_csv("postgres_push.csv")
    dtm_raw = read_csv("derived_tables_generated.csv")

    team_keys = {r["key"] for r in teams_raw}
    type_keys = {r["key"] for r in types_raw}

    # ---- types / teams / categories -> JS structures -----------------
    type_meta = {}
    type_order_pairs = []
    type_team = {}
    for r in types_raw:
        if r["team"] not in team_keys:
            err("types.csv: type '%s' references unknown team '%s'" % (r["key"], r["team"]))
        type_meta[r["key"]] = {"label": r["label"], "cssVar": r["css_var"], "hex": r["hex"]}
        type_team[r["key"]] = r["team"]
        type_order_pairs.append((int(r["chip_order"]), r["key"]))
    type_order = [k for _, k in sorted(type_order_pairs)]

    team_meta = {}
    for r in teams_raw:
        team_meta[r["key"]] = {"label": r["label"], "cssVar": r["css_var"], "hex": r["hex"]}

    cat_order = []
    for r in sorted(categories_raw, key=lambda r: int(r["sort_order"])):
        if r["team"] not in team_keys:
            err("categories.csv: category '%s' references unknown team '%s'" % (r["key"], r["team"]))
        cat_order.append({"key": r["key"], "label": r["label"], "team": r["team"]})

    category_map = {}
    for r in ext_raw:
        category_map[r["name"]] = r["category"]

    # ---- tasks ---------------------------------------------------------
    tasks = []
    seen_names = set()
    for r in tasks_raw:
        name = r["name"].strip()
        if not name:
            err("tasks.csv: row with empty name")
            continue
        if name in seen_names:
            err("tasks.csv: duplicate task name '%s'" % name)
        seen_names.add(name)
        if r["type"] not in type_keys:
            err("tasks.csv: task '%s' has unknown type '%s' (see types.csv for valid keys)" % (name, r["type"]))
        try:
            order = int(r["order"])
        except ValueError:
            err("tasks.csv: task '%s' has non-numeric order '%s'" % (name, r["order"]))
            order = 0
        tasks.append({
            "name": name,
            "order": order,
            "group": r["group"].strip(),
            "type": r["type"].strip(),
            "usage": r["usage"].strip(),
            "execDeps": split_list(r["exec_deps"]),
            "m": split_list(r["masters"]),
            "vague": r["vague"].strip() or None,
            "note": r["note"].strip() or None,
        })

    by_name = {t["name"]: t for t in tasks}
    known_names = set(by_name) | set(category_map)

    # ---- schemas ---------------------------------------------------------
    schemas = {}
    for r in schemas_raw:
        table = r["table_name"].strip()
        if table not in known_names:
            warn("schemas.csv: '%s' is not a task in tasks.csv and not listed in external_dependencies.csv — "
                 "double-check the table name." % table)
        try:
            order = int(r["order"])
        except ValueError:
            err("schemas.csv: '%s'.'%s' has non-numeric order '%s'" % (table, r["column_name"], r["order"]))
            order = 0
        schemas.setdefault(table, []).append({
            "column": r["column_name"].strip(),
            "type": r["data_type"].strip(),
            "key": r["key"].strip(),
            "description": r["description"].strip(),
            "order": order,
        })
    for cols in schemas.values():
        cols.sort(key=lambda c: c["order"])
        for c in cols:
            del c["order"]
    # only tables that are actual tasks in tasks.csv are browsable on the
    # Schemas page — a table with a schema but no task row (e.g. a
    # dashboard-only table) stays out of the index/search entirely.
    # Resolution SP tasks have no columns at all (they're stored procedures,
    # not tables) but still need to show up in the index with a notice, so
    # they're added here even though they have no rows in schemas.csv.
    resolution_sp_names = sorted(t["name"] for t in tasks if t["type"] == "resolution_sp")
    schema_names = sorted(set(n for n in schemas if n in by_name) | set(resolution_sp_names))

    # ---- DDL (auto-generated empty-table CREATE statement per schema) -----
    table_ddl = {}
    for table, cols in schemas.items():
        col_lines = ",\n".join("  %s %s" % (c["column"], c["type"]) for c in cols)
        table_ddl[table] = "CREATE TABLE IF NOT EXISTS `{Project ID}.{Dataset}.%s` (\n%s\n);" % (table, col_lines)

    # ---- postgres push (GBQ -> PostgreSQL sync DDLs for a subset of tables) -
    pg_push = {}
    for r in pg_push_raw:
        table = r["Table Name"].strip()
        if not table:
            continue
        if table not in known_names:
            warn("postgres_push.csv: '%s' is not a task in tasks.csv and not listed in external_dependencies.csv — "
                 "double-check the table name." % table)
        ptype = r["Type"].strip().lower()
        if ptype not in ("direct", "version"):
            err("postgres_push.csv: '%s' has unknown Type '%s' (must be 'Direct' or 'Version')" % (table, r["Type"]))
        pg_table_ddl = (r["Table DDL"] or "").strip()
        pg_view_ddl = (r["View DDL"] or "").strip()
        pg_push[table] = {
            "schema": r["Schema"].strip(),
            "type": ptype,
            "tableDdl": pg_table_ddl or None,
            # a handful of rows carry a plain-English note instead of real SQL
            # (e.g. "DDL already exists in another schema") — flag those so
            # the UI can render them as a notice instead of a code block.
            "tableIsNote": bool(pg_table_ddl) and not re.match(r"(?i)^\s*create\b", pg_table_ddl),
            "viewDdl": pg_view_ddl if (pg_view_ddl and pg_view_ddl != "-") else None,
        }

    # ---- derived tables mapping (DTM) source data --------------------------
    dtm_rows = []
    dtm_names_seen = set()
    for r in dtm_raw:
        name = r["name"].strip()
        if not name:
            continue
        dtm_names_seen.add(name)

    for r in dtm_raw:
        name = r["name"].strip()
        if not name:
            continue

        def parse_list(field_name):
            raw = (r[field_name] or "").strip()
            if not raw:
                return []
            try:
                value = json.loads(raw)
            except ValueError:
                err("derived_tables_generated.csv: '%s' has invalid %s '%s' (expected a JSON array)"
                    % (name, field_name, raw))
                return []
            if not isinstance(value, list):
                err("derived_tables_generated.csv: '%s' has non-array %s '%s'" % (name, field_name, raw))
                return []
            return value

        parent_id = parse_list("parent_id")
        for p in parent_id:
            if p not in dtm_names_seen and p not in known_names:
                warn("derived_tables_generated.csv: '%s' lists parent '%s' that is not a DTM table, "
                     "task, or external dependency — double-check the name." % (name, p))

        dtm_rows.append({
            "name": name,
            "type": r["type"].strip(),
            "label": r["label"].strip(),
            "db": r["db"].strip(),
            "parent_id": parent_id,
            "db_type": r["db_type"].strip(),
            "tables_tobe_copied": parse_list("tables_tobe_copied"),
            "replace_flag_gbq": r["replace_flag_gbq"].strip(),
            "replace_flag_psg": r["replace_flag_psg"].strip(),
            "run_in": r["run_in"].strip(),
            "schedule_interval": r["schedule_interval"].strip(),
            "execution_order": r["execution_order"].strip(),
        })

    # ---- query params (table-specific) ------------------------------------
    query_params = {}
    for r in query_params_raw:
        table = r["table_name"].strip()
        if not table:
            continue
        if table not in known_names:
            warn("query_params.csv: '%s' is not a task in tasks.csv and not listed in external_dependencies.csv — "
                 "double-check the table name." % table)
        param_key = r["param_key"].strip()
        query_params.setdefault(table, []).append({
            "paramKey": param_key,
            "label": r["label"].strip(),
            "default": r["default"].strip(),
            "description": r["description"].strip(),
        })

    # ---- queries -----------------------------------------------------------
    queries = {}
    for r in queries_raw:
        table = r["table_name"].strip()
        if not table:
            continue  # trailing blank rows in the sheet export
        if table not in known_names:
            warn("queries.csv: '%s' is not a task in tasks.csv and not listed in external_dependencies.csv — "
                 "double-check the table name." % table)
        try:
            step = int(r["step"])
        except ValueError:
            err("queries.csv: '%s' has non-numeric step '%s'" % (table, r["step"]))
            step = 0
        queries.setdefault(table, []).append({
            "step": step,
            "label": r["label"].strip(),
            "query": r["query"],
            "notes": r["notes"].strip(),
        })
    for rows in queries.values():
        rows.sort(key=lambda q: q["step"])
    # same rule as schema_names: only tables that are actual tasks in
    # tasks.csv are browsable on the Build Queries page. Resolution SP tasks
    # have no query rows either — added here so they show up with a notice.
    query_names = sorted(set(n for n in queries if n in by_name) | set(resolution_sp_names))

    # declared params whose {param_key} placeholder never actually appears in
    # that table's query text (stale/renamed param)
    for table, params in query_params.items():
        combined = "\n".join(q["query"] or "" for q in queries.get(table, []))
        for p in params:
            if ("{" + p["paramKey"] + "}") not in combined:
                warn("query_params.csv: '%s'.'%s' isn't referenced as {%s} in any query for that table in "
                     "queries.csv." % (table, p["paramKey"], p["paramKey"]))

    # plausible {Placeholder}-shaped tokens in a query that aren't {Project ID},
    # {Dataset}, or declared for that table in query_params.csv (likely a typo)
    for table, rows in queries.items():
        declared = {p["paramKey"] for p in query_params.get(table, [])}
        known_tokens = set(GLOBAL_QUERY_PARAMS) | declared
        for q in rows:
            for m in PLAUSIBLE_TOKEN_RE.finditer(q["query"] or ""):
                tok = m.group(1)
                if tok not in known_tokens:
                    warn("queries.csv: '%s' (step %s) uses {%s}, which isn't {Project ID}, {Dataset}, or declared "
                         "for that table in query_params.csv — check for a typo." % (table, q["step"], tok))

    # dependencies that resolve to nothing we know about at all
    for t in tasks:
        for dep in t["execDeps"]:
            if dep not in by_name and dep not in category_map:
                warn("tasks.csv: task '%s' depends on '%s', which is not a task in tasks.csv and not listed in "
                     "external_dependencies.csv — it will be classified as 'Derived' by default. Add it to "
                     "external_dependencies.csv if that's wrong." % (t["name"], dep))

    # same-group conflicts: a task depending on something scheduled in its own group
    same_group_issues = []
    for t in tasks:
        for dep in t["execDeps"]:
            d = by_name.get(dep)
            if d and d["group"] == t["group"]:
                same_group_issues.append({"task": t["name"], "dep": dep, "group": t["group"]})
    for i in same_group_issues:
        warn("same-group conflict: '%s' is scheduled in %s alongside '%s', which it depends on — "
             "it should run after, not in parallel with, that task." % (i["task"], i["group"], i["dep"]))

    # dependency vs. query validation: for every task with both execDeps and a
    # build query, flag any declared dependency whose name doesn't appear
    # anywhere in the concatenated SQL text of that task's query steps.
    # Validation-only — never rewrites query text.
    dep_query_mismatches = {}
    for t in tasks:
        name = t["name"]
        if not t["execDeps"] or name not in queries:
            continue
        combined = "\n".join((q["query"] or "") for q in queries[name]).lower()
        missing = [dep for dep in t["execDeps"] if dep.lower() not in combined]
        if missing:
            dep_query_mismatches[name] = missing
            warn("dependency/query mismatch: '%s' depends on %s, but %s not found in its query text." %
                 (name, ", ".join("'%s'" % m for m in missing),
                  "it is" if len(missing) == 1 else "they are"))

    # ---- nav sections ----------------------------------------------------
    for r in nav_raw:
        if r["icon"] not in ICON_PATHS:
            err("nav_sections.csv: row '%s' uses unknown icon '%s' (valid: %s). Add a new SVG to ICON_PATHS in "
                "generate.py and the ICON object in template.html to introduce a new glyph."
                % (r["id"], r["icon"], ", ".join(sorted(ICON_PATHS))))
        if r["status"] not in ("active", "soon"):
            err("nav_sections.csv: row '%s' has status '%s' (must be 'active' or 'soon')" % (r["id"], r["status"]))

    if warnings:
        print("%d warning(s):" % len(warnings))
        for w in warnings:
            print("  - " + w)
        print("")

    if errors:
        sys.stderr.write("Found %d error(s) — nothing was written:\n" % len(errors))
        for e in errors:
            sys.stderr.write("  - %s\n" % e)
        sys.exit(1)

    # ---- derived counts used in copy text --------------------------------
    task_count = len(tasks)
    groups_seen = []
    for t in tasks:
        if t["group"] not in groups_seen:
            groups_seen.append(t["group"])
    group_count = len(groups_seen)
    promoted_types = {"ada_table", "resolution_sp", "sync_sp"}
    promoted_count = sum(1 for t in tasks if t["type"] in promoted_types)
    table_count = task_count - promoted_count

    def sub_tokens(text):
        return (text
                .replace("__TASK_COUNT__", str(task_count))
                .replace("__GROUP_COUNT__", str(group_count))
                .replace("__TABLE_COUNT__", str(table_count))
                .replace("__PROMOTED_COUNT__", str(promoted_count)))

    # ---- build nav buttons + NAV_DEFS + reserved pages -------------------
    nav_buttons = []
    nav_defs = []
    reserved_sections = []
    for idx, r in enumerate(nav_raw):
        selected = "true" if idx == 0 else "false"
        tabindex = "" if idx == 0 else ' tabindex="-1"'
        nav_buttons.append(
            '<button role="tab" id="%s" aria-controls="%s" aria-selected="%s"%s class="nav-item"></button>'
            % (r["id"], r["panel_id"], selected, tabindex)
        )
        nav_defs.append({
            "id": r["id"], "panel": r["panel_id"], "icon": r["icon"], "label": r["label"],
            "soon": (r["status"] == "soon"),
        })
        if r["status"] == "soon":
            icon_svg = ('<svg class="icn" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" '
                        'stroke-linecap="round" stroke-linejoin="round">%s</svg>' % ICON_PATHS[r["icon"]])
            reserved_sections.append(
                '    <section id="%s" class="page" role="tabpanel" aria-labelledby="%s" hidden>\n'
                '      <div class="page-head">\n'
                '        <h1 class="page-title">%s</h1>\n'
                '        <p class="page-desc">%s</p>\n'
                '      </div>\n'
                '      <div class="reserved">\n'
                '        %s\n'
                '        <h3>%s</h3>\n'
                '        <p>%s</p>\n'
                '        <span class="soon-badge">%s</span>\n'
                '      </div>\n'
                '    </section>'
                % (r["panel_id"], r["id"], r["page_title"], sub_tokens(r["page_description"]),
                   icon_svg, r["reserved_heading"], sub_tokens(r["reserved_body"]), r["badge_text"])
            )

    nav_explore_desc = ""
    nav_schema_desc = ""
    nav_queries_desc = ""
    for r in nav_raw:
        if r["id"] == "nav-explore":
            nav_explore_desc = sub_tokens(r["page_description"])
        if r["id"] == "nav-schema":
            nav_schema_desc = sub_tokens(r["page_description"])
        if r["id"] == "nav-queries":
            nav_queries_desc = sub_tokens(r["page_description"])

    # ---- assemble template ------------------------------------------------
    tpl = open(TEMPLATE_PATH, encoding="utf-8").read()

    # How It Works content is hand-written prose and can't be generated from
    # the CSVs, but any table name it bolds (<b>table_name</b>) can be
    # checked against the current data set, so a rename/removal in tasks.csv
    # gets caught here instead of silently going stale in the docs.
    doc_start = tpl.find("var DOC_CONTENT")
    doc_end = tpl.find("var HIW_ORDER", doc_start)
    if doc_start != -1 and doc_end != -1:
        doc_block = tpl[doc_start:doc_end]
        referenced = set(re.findall(r"<b>([a-z][a-z0-9]*(?:_[a-z0-9]+)+)</b>", doc_block))
        for name in sorted(referenced - known_names):
            warn("template.html: How It Works content references '%s' in <b>...</b>, but it is not a "
                 "current task or external dependency — the doc text may be stale." % name)

    def js(value):
        return json.dumps(value, ensure_ascii=False)

    replacements = {
        "<!--__NAV_BUTTONS__-->": "\n".join("      " + b for b in nav_buttons),
        "__NAV_EXPLORE_DESC__": nav_explore_desc,
        "__NAV_SCHEMA_DESC__": nav_schema_desc,
        "__NAV_QUERIES_DESC__": nav_queries_desc,
        "<!--__RESERVED_PAGES__-->": "\n".join(reserved_sections),
        "/*__SCHEMAS__*/": js(schemas),
        "/*__SCHEMA_NAMES__*/": js(schema_names),
        "/*__TABLE_DDL__*/": js(table_ddl),
        "/*__PG_PUSH__*/": js(pg_push),
        "/*__DTM_ROWS__*/": js(dtm_rows),
        "/*__QUERIES__*/": js(queries),
        "/*__QUERY_NAMES__*/": js(query_names),
        "/*__QUERY_PARAMS__*/": js(query_params),
        "/*__GLOBAL_QUERY_PARAMS__*/": js(list(GLOBAL_QUERY_PARAMS)),
        "/*__DEP_QUERY_MISMATCHES__*/": js(dep_query_mismatches),
        "/*__TYPE_META__*/": js(type_meta),
        "/*__TYPE_ORDER__*/": js(type_order),
        "/*__TYPE_TEAM__*/": js(type_team),
        "/*__CATEGORY_MAP__*/": js(category_map),
        "/*__CAT_ORDER__*/": js(cat_order),
        "/*__TEAM_META__*/": js(team_meta),
        "/*__DATA__*/": js(tasks),
        "/*__NAV_DEFS__*/": js(nav_defs),
    }
    for marker, value in replacements.items():
        if marker not in tpl:
            err("template.html: marker %s not found" % marker)
        tpl = tpl.replace(marker, value)

    if errors:
        sys.stderr.write("Found %d error(s) — nothing was written:\n" % len(errors))
        for e in errors:
            sys.stderr.write("  - %s\n" % e)
        sys.exit(1)

    tpl = sub_tokens(tpl)

    with open(OUT_PATH, "w", encoding="utf-8") as f:
        f.write(tpl)
    print("Wrote %s (%d tasks, %d groups, %d tables + %d promoted, %d nav sections, %d coming-soon, "
          "%d tables with build queries)"
          % (OUT_PATH, task_count, group_count, table_count, promoted_count, len(nav_raw),
             len(reserved_sections), len(query_names)))

    # optional syntax sanity check if node is available
    try:
        script = tpl.split("<script>", 1)[1].rsplit("</script>", 1)[0]
        check = subprocess.run(["node", "-e", "new Function(process.argv[1]); console.log('Syntax OK');", script],
                                capture_output=True, text=True, timeout=15)
        if check.returncode != 0:
            sys.stderr.write("WARNING: generated <script> failed a Node.js syntax check:\n" + check.stderr + "\n")
        else:
            print(check.stdout.strip())
    except FileNotFoundError:
        print("(node not found on PATH — skipped syntax check)")

    # ---- also emit a plain JS data module for the ootb-app React build ----
    react_data_path = os.path.join(os.path.dirname(BASE), "ootb-app", "src", "data", "ootbData.js")
    if os.path.isdir(os.path.dirname(react_data_path)):
        nav_substituted = [
            {**r, "page_description": sub_tokens(r["page_description"]), "reserved_body": sub_tokens(r["reserved_body"])}
            for r in nav_raw
        ]
        module = (
            "// AUTO-GENERATED by ootb_config/generate.py — do not edit by hand.\n"
            "// Edit the CSVs in ootb_config/ and re-run `python3 generate.py` instead.\n\n"
            "export const DATA = %s;\n\n"
            "export const TYPE_META = %s;\n\n"
            "export const TYPE_ORDER = %s;\n\n"
            "export const TYPE_TEAM = %s;\n\n"
            "export const CATEGORY_MAP = %s;\n\n"
            "export const CAT_ORDER = %s;\n\n"
            "export const TEAM_META = %s;\n\n"
            "export const NAV_SECTIONS = %s;\n\n"
            "export const SCHEMAS = %s;\n\n"
            "export const SCHEMA_NAMES = %s;\n\n"
            "export const TABLE_DDL = %s;\n\n"
            "export const PG_PUSH = %s;\n\n"
            "export const QUERIES = %s;\n\n"
            "export const QUERY_NAMES = %s;\n\n"
            "export const QUERY_PARAMS = %s;\n\n"
            "export const GLOBAL_QUERY_PARAMS = %s;\n\n"
            "export const DEP_QUERY_MISMATCHES = %s;\n\n"
            "export const COUNTS = %s;\n"
        ) % (
            js(tasks), js(type_meta), js(type_order), js(type_team), js(category_map), js(cat_order),
            js(team_meta), js(nav_substituted), js(schemas), js(schema_names), js(table_ddl), js(pg_push),
            js(queries), js(query_names), js(query_params), js(list(GLOBAL_QUERY_PARAMS)),
            js(dep_query_mismatches),
            js({"taskCount": task_count, "groupCount": group_count, "tableCount": table_count,
                "promotedCount": promoted_count}),
        )
        with open(react_data_path, "w", encoding="utf-8") as f:
            f.write(module)
        print("Wrote %s" % react_data_path)
    else:
        print("(ootb-app/src/data not found — skipped React data module)")


if __name__ == "__main__":
    main()
