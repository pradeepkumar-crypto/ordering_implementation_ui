import React, { useState } from 'react';
import { DATA, TYPE_META } from '../../data/ootbData';
import { GROUPS, byName, downstream, FLAGGED } from '../../utils/ootbLogic';

const NODE_W = 180;
const NODE_H = 40;
const ROW_GAP = 10;
const COL_GAP = 56;
const MARGIN = 24;
const HEADER_H = 24;

export default function ExecutionFlowGraph({ onOpenTask }) {
  const [selected, setSelected] = useState(null);

  const colTasks = GROUPS.map((g) => DATA.filter((t) => t.group === g));
  const maxRows = Math.max(...colTasks.map((c) => c.length));
  const width = MARGIN * 2 + GROUPS.length * NODE_W + (GROUPS.length - 1) * COL_GAP;
  const height = MARGIN * 2 + HEADER_H + maxRows * (NODE_H + ROW_GAP);

  const positions = {};
  colTasks.forEach((arr, ci) => {
    const x = MARGIN + ci * (NODE_W + COL_GAP);
    arr.forEach((t, ri) => {
      const y = MARGIN + HEADER_H + ri * (NODE_H + ROW_GAP);
      positions[t.name] = { x, y };
    });
  });

  const sel = selected ? byName[selected] : null;
  const incoming = sel ? sel.execDeps.filter((d) => positions[d]) : [];
  const outgoing = sel ? (downstream[selected] || []).map((x) => x.name).filter((d) => positions[d]) : [];
  const related = new Set([selected, ...incoming, ...outgoing]);

  function edgePath(fromName, toName) {
    const a = positions[fromName];
    const b = positions[toName];
    const x1 = a.x + NODE_W;
    const y1 = a.y + NODE_H / 2;
    const x2 = b.x;
    const y2 = b.y + NODE_H / 2;
    const dx = Math.max(28, (x2 - x1) * 0.4);
    return `M${x1},${y1} C${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}`;
  }

  return (
    <figure style={{ margin: 0 }}>
      <div style={{ fontSize: 12, color: '#6B7089', marginBottom: 12, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <span>Click a task to trace its lineage. Graph view always shows all {DATA.length} tasks.</span>
        <span><span style={{ display: 'inline-block', width: 14, height: 2, background: '#4A55E8', marginRight: 6 }} />feeds the selected task</span>
        <span><span style={{ display: 'inline-block', width: 14, height: 2, background: '#1FAE5C', marginRight: 6 }} />depends on the selected task</span>
      </div>
      <div style={{ overflowX: 'auto', background: '#fff', border: '1px solid #E3E5EE', borderRadius: 12, padding: 18 }}>
        <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label="Execution dependency graph">
          <defs>
            <marker id="ootb-arrow-indigo" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <polygon points="0,0 8,4 0,8" fill="#4A55E8" />
            </marker>
            <marker id="ootb-arrow-emerald" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <polygon points="0,0 8,4 0,8" fill="#1FAE5C" />
            </marker>
          </defs>
          {GROUPS.map((g, ci) => (
            <text key={g} x={MARGIN + ci * (NODE_W + COL_GAP)} y={MARGIN + 14} fontFamily="monospace" fontSize="10.5" fontWeight="600" fill="#6B7089">
              {g} · {colTasks[ci].length}
            </text>
          ))}
          {selected &&
            incoming.map((n) => (
              <path key={`in-${n}`} d={edgePath(n, selected)} fill="none" stroke="#4A55E8" strokeWidth="1.6" markerEnd="url(#ootb-arrow-indigo)" opacity="0.85" />
            ))}
          {selected &&
            outgoing.map((n) => (
              <path key={`out-${n}`} d={edgePath(selected, n)} fill="none" stroke="#1FAE5C" strokeWidth="1.6" markerEnd="url(#ootb-arrow-emerald)" opacity="0.85" />
            ))}
          {DATA.map((t) => {
            const pos = positions[t.name];
            const meta = TYPE_META[t.type];
            const dim = selected && !related.has(t.name);
            const isSel = selected === t.name;
            const shortName = t.name.length > 20 ? t.name.slice(0, 18) + '…' : t.name;
            return (
              <g
                key={t.name}
                tabIndex={0}
                role="button"
                aria-label={`${t.name} — ${meta.label} — Group ${t.group}`}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  const next = selected === t.name ? null : t.name;
                  setSelected(next);
                  if (next) onOpenTask(next);
                }}
              >
                <rect
                  x={pos.x}
                  y={pos.y}
                  width={NODE_W}
                  height={NODE_H}
                  rx={8}
                  fill="#fff"
                  stroke={isSel ? '#4A55E8' : '#D3D6E3'}
                  strokeWidth={isSel ? 2 : 1.3}
                  opacity={dim ? 0.32 : 1}
                />
                <rect x={pos.x} y={pos.y} width={4} height={NODE_H} rx={2} fill={meta.hex} opacity={dim ? 0.32 : 0.9} />
                <text x={pos.x + 13} y={pos.y + NODE_H / 2 + 3.5} fontFamily="monospace" fontSize="10.3" fill="#10152B" opacity={dim ? 0.35 : 1}>
                  {shortName}
                </text>
                {FLAGGED[t.name] && <circle cx={pos.x + NODE_W - 10} cy={pos.y + 10} r={3.4} fill="#B45309" />}
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption style={{ fontSize: 12, color: '#6B7089', marginTop: 12 }}>
        {DATA.length} tasks arranged left-to-right by parallel execution group, P1 through P{GROUPS.length}. Select a task to
        trace what feeds it and what it feeds.
      </figcaption>
    </figure>
  );
}
