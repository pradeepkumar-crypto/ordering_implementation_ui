import React from 'react';
import { Panel } from '../../components/Panel';
import { Badge } from '../../components/Badge';
import { TYPE_META, TEAM_META } from '../../data/ootbData';
import { byName, categorize, downstream, FLAGGED, CAT_ORDER } from '../../utils/ootbLogic';

function TablePill({ name, onOpen }) {
  const known = byName[name];
  if (!known) {
    return (
      <span
        style={{
          fontFamily: 'monospace',
          fontSize: 12,
          padding: '5px 10px',
          borderRadius: 999,
          border: '1px dashed #C6C9D6',
          color: '#6B7089',
          display: 'inline-block',
          marginRight: 6,
          marginBottom: 6,
        }}
      >
        {name} · external
      </span>
    );
  }
  const meta = TYPE_META[known.type];
  return (
    <button
      type="button"
      onClick={() => onOpen(name)}
      style={{
        fontFamily: 'monospace',
        fontSize: 12,
        padding: '5px 10px',
        borderRadius: 999,
        border: `1px solid ${meta.hex}55`,
        color: meta.hex,
        background: '#fff',
        cursor: 'pointer',
        marginRight: 6,
        marginBottom: 6,
      }}
    >
      {name}
    </button>
  );
}

export default function TaskPanel({ taskName, onOpen, onClose }) {
  const t = taskName ? byName[taskName] : null;
  if (!t) return null;
  const meta = TYPE_META[t.type];
  const cats = categorize(t);
  const feeds = downstream[t.name] || [];

  return (
    <Panel
      anchor="right"
      open={!!taskName}
      onClose={onClose}
      size="large"
      title={t.name}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              padding: '3px 10px',
              borderRadius: 6,
              color: '#fff',
              background: meta.hex,
            }}
          >
            {meta.label}
          </span>
          <span style={{ marginLeft: 10, color: '#6B7089', fontSize: 13 }}>Group {t.group}</span>
          <p style={{ marginTop: 8, color: '#3A3F55', fontSize: 13.5 }}>{t.usage}</p>
        </div>

        {t.note && (
          <div style={{ padding: '12px 14px', background: '#F6F7FB', borderLeft: '3px solid #4A55E8', fontSize: 12.5 }}>
            {t.note}
          </div>
        )}

        {FLAGGED[t.name] && (
          <div style={{ padding: '12px 14px', background: '#FFF7ED', borderLeft: '3px solid #B45309', fontSize: 12.5 }}>
            This task shares Group {t.group} with something it depends on. Confirm it should run right after that
            task rather than alongside it.
          </div>
        )}

        <div>
          <h4 style={{ fontSize: 11, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#6B7089', marginBottom: 10 }}>
            Depends on
          </h4>
          {CAT_ORDER.map((c) => {
            const list = cats[c.key] || [];
            const team = TEAM_META[c.team];
            return (
              <div key={c.key} style={{ marginBottom: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: team.hex || '#3A3F55', display: 'block', marginBottom: 6 }}>
                  {c.label} — {team.label}
                </span>
                {list.length ? (
                  <div>
                    {list.map((n) => (
                      <TablePill key={n} name={n} onOpen={onOpen} />
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: 12.5, color: '#6B7089', fontStyle: 'italic', margin: 0 }}>None for this task.</p>
                )}
              </div>
            );
          })}
          {t.vague && (
            <p style={{ fontSize: 12.5, color: '#6B7089', fontStyle: 'italic', marginTop: 8 }}>
              No specific dependency listed — sheet says: &ldquo;{t.vague}.&rdquo;
            </p>
          )}
        </div>

        <div>
          <h4 style={{ fontSize: 11, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#6B7089', marginBottom: 10 }}>
            Feeds into
          </h4>
          {feeds.length ? (
            <div>
              {feeds.map((f) => (
                <TablePill key={f.name} name={f.name} onOpen={onOpen} />
              ))}
            </div>
          ) : (
            <p style={{ fontSize: 12.5, color: '#6B7089', fontStyle: 'italic', margin: 0 }}>
              Nothing downstream depends on this task.
            </p>
          )}
        </div>
      </div>
    </Panel>
  );
}
