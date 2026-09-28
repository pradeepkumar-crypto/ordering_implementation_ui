import React, { useEffect, useMemo, useState } from 'react';
import { Checkbox } from '../../components/Checkbox';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { DATA, TYPE_META, TEAM_META } from '../../data/ootbData';
import { GROUPS, FLAGGED, teamTagsFor, typeVisible, matchesQuery } from '../../utils/ootbLogic';

const CHECK_KEY = 'ootb_checked_v1';

function loadChecked() {
  try {
    const stored = JSON.parse(localStorage.getItem(CHECK_KEY) || '[]');
    const map = {};
    stored.forEach((n) => (map[n] = true));
    return map;
  } catch (e) {
    return {};
  }
}

function groupDesc(idx) {
  if (idx === 0) return "Nothing here depends on any other tracked task — request source and integration inputs and start immediately.";
  return `Unlocked once every task in ${GROUPS[idx - 1]} is complete. Nothing inside ${GROUPS[idx]} blocks anything else in it.`;
}

export default function ExecutionFlowRow({ activeTypes, query, onOpenTask }) {
  const [checked, setChecked] = useState(loadChecked);

  useEffect(() => {
    try {
      localStorage.setItem(CHECK_KEY, JSON.stringify(Object.keys(checked)));
    } catch (e) {}
  }, [checked]);

  const totalChecked = Object.keys(checked).filter((n) => checked[n]).length;

  const groupedRows = useMemo(
    () =>
      GROUPS.map((g, idx) => {
        const groupTasks = DATA.filter((t) => t.group === g);
        const filtered = groupTasks.filter((t) => typeVisible(activeTypes, t.type) && matchesQuery(t, query));
        return { g, idx, groupTasks, filtered };
      }),
    [activeTypes, query]
  );

  const anyVisible = groupedRows.some((r) => r.filtered.length);

  function setOne(name, val) {
    setChecked((prev) => {
      const next = { ...prev };
      if (val) next[name] = true;
      else delete next[name];
      return next;
    });
  }

  function markGroup(groupTasks) {
    const allDone = groupTasks.every((t) => checked[t.name]);
    setChecked((prev) => {
      const next = { ...prev };
      groupTasks.forEach((t) => {
        if (allDone) delete next[t.name];
        else next[t.name] = true;
      });
      return next;
    });
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#6B7089' }}>
          {totalChecked} / {DATA.length}
        </span>
        <div style={{ width: 140, height: 6, borderRadius: 999, background: '#F6F7FB', overflow: 'hidden' }}>
          <span
            style={{
              display: 'block',
              height: '100%',
              background: '#1FAE5C',
              width: `${Math.round((totalChecked / DATA.length) * 100)}%`,
            }}
          />
        </div>
        <Button label="Reset checklist" variant="outlined" size="small" onClick={() => setChecked({})} />
      </div>

      {!anyVisible && (
        <div style={{ padding: '36px 18px', textAlign: 'center', color: '#6B7089', fontSize: 13.5 }}>
          No tasks match that search.
        </div>
      )}

      {groupedRows.map(({ g, idx, groupTasks, filtered }) => {
        if (!filtered.length) return null;
        const gChecked = groupTasks.filter((t) => checked[t.name]).length;
        return (
          <div key={g} style={{ background: '#fff', border: '1px solid #E3E5EE', borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 12,
                padding: '11px 18px',
                background: '#F6F7FB',
                borderBottom: '1px solid #E3E5EE',
                flexWrap: 'wrap',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontWeight: 700, fontSize: 12.5 }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 10.5, background: '#EEF0FD', color: '#333DC4', padding: '2px 8px', borderRadius: 999 }}>
                    {g}
                  </span>
                  <span style={{ fontFamily: 'monospace', color: '#6B7089' }}>
                    {gChecked} / {groupTasks.length} built
                  </span>
                </div>
                <div style={{ fontSize: 11.5, color: '#6B7089', marginTop: 3 }}>{groupDesc(idx)}</div>
              </div>
              <Button
                label={gChecked === groupTasks.length ? 'Unmark group' : 'Mark group done'}
                variant="text"
                size="small"
                onClick={() => markGroup(groupTasks)}
              />
            </div>

            {filtered.map((t) => {
              const meta = TYPE_META[t.type];
              const teams = teamTagsFor(t);
              const isChecked = !!checked[t.name];
              return (
                <div
                  key={t.name}
                  style={{
                    display: 'flex',
                    gap: 13,
                    alignItems: 'flex-start',
                    padding: '13px 18px',
                    borderBottom: '1px solid #E3E5EE',
                    opacity: isChecked ? 0.6 : 1,
                  }}
                >
                  <Checkbox checked={isChecked} onChange={() => setOne(t.name, !isChecked)} withoutFormLabel />
                  <div style={{ flex: 1, minWidth: 0, cursor: 'pointer' }} onClick={() => onOpenTask(t.name)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 600, textDecoration: isChecked ? 'line-through' : 'none' }}>
                        {t.name}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: '0.02em',
                          padding: '2px 8px',
                          borderRadius: 6,
                          color: '#fff',
                          background: meta.hex,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {meta.label}
                      </span>
                      {FLAGGED[t.name] && <Badge label="Check order" variant="outlined" color="warning" size="small" />}
                    </div>
                    <div style={{ fontSize: 12, color: '#6B7089', marginTop: 3 }}>{t.usage}</div>
                    {(teams.length > 0 || t.vague) && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                        {teams.map((k) => (
                          <span
                            key={k}
                            style={{
                              fontSize: 10.5,
                              fontWeight: 600,
                              padding: '3px 9px',
                              borderRadius: 999,
                              border: `1px solid ${TEAM_META[k].hex}`,
                              color: TEAM_META[k].hex,
                            }}
                          >
                            Needs: {TEAM_META[k].label}
                          </span>
                        ))}
                        {t.vague && (
                          <span style={{ fontSize: 10.5, fontWeight: 600, padding: '3px 9px', borderRadius: 999, border: '1px dashed #6B7089', color: '#6B7089' }}>
                            {t.vague}
                          </span>
                        )}
                      </div>
                    )}
                    {t.execDeps.length > 0 && (
                      <div style={{ fontSize: 11, color: '#6B7089', marginTop: 7, fontFamily: 'monospace' }}>
                        After: {t.execDeps.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
