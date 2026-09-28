import { DATA, TYPE_TEAM, CATEGORY_MAP, CAT_ORDER } from '../data/ootbData';

export const byName = {};
DATA.forEach((t) => {
  byName[t.name] = t;
});

export const GROUPS = [];
(() => {
  const seen = {};
  DATA.forEach((t) => {
    if (!seen[t.group]) {
      seen[t.group] = true;
      GROUPS.push(t.group);
    }
  });
})();

export const downstream = {};
DATA.forEach((t) => {
  downstream[t.name] = [];
});
DATA.forEach((consumer) => {
  consumer.execDeps.forEach((dep) => {
    if (!downstream[dep]) return;
    if (downstream[dep].some((x) => x.name === consumer.name)) return;
    downstream[dep].push({ name: consumer.name, type: consumer.type });
  });
});

export function teamTagsFor(t) {
  const teams = [];
  if (t.m.length && !teams.includes('sourcing')) teams.push('sourcing');
  t.execDeps.forEach((d) => {
    const dep = byName[d];
    if (dep) {
      const team = TYPE_TEAM[dep.type];
      if (team && !teams.includes(team)) teams.push(team);
    }
  });
  return teams;
}

function categoryFor(name) {
  const dep = byName[name];
  if (dep) {
    if (dep.type === 'ada_table') return 'ADA';
    if (dep.type === 'backsync' || dep.type === 'resolution_sp') return 'Backsync';
    return 'Derived';
  }
  return CATEGORY_MAP[name] || 'Derived';
}

export function categorize(t) {
  const out = { Master: [], Derived: [], Backsync: [], AnR: [], ADA: [] };
  t.m.forEach((n) => out.Master.push(n));
  t.execDeps.forEach((d) => {
    const cat = categoryFor(d);
    if (!out[cat]) out[cat] = [];
    out[cat].push(d);
  });
  return out;
}

export function sameGroupIssues() {
  const out = [];
  DATA.forEach((t) => {
    t.execDeps.forEach((d) => {
      const dep = byName[d];
      if (dep && dep.group === t.group) out.push({ task: t.name, dep: d, group: t.group });
    });
  });
  return out;
}

export const ISSUES = sameGroupIssues();
export const FLAGGED = {};
ISSUES.forEach((i) => {
  FLAGGED[i.task] = true;
});

export function hasAnySelected(activeSet) {
  return Object.keys(activeSet).some((k) => activeSet[k]);
}

export function typeVisible(activeSet, type) {
  return !hasAnySelected(activeSet) || !!activeSet[type];
}

export function matchesQuery(t, q) {
  if (!q) return true;
  const needle = q.toLowerCase();
  return t.name.toLowerCase().includes(needle) || t.usage.toLowerCase().includes(needle);
}

export { CAT_ORDER };
