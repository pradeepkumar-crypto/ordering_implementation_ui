import React from 'react';
import { Chips } from '../../components/Chips';
import { DATA, TYPE_META, TYPE_ORDER } from '../../data/ootbData';
import { hasAnySelected } from '../../utils/ootbLogic';

const counts = {};
TYPE_ORDER.forEach((k) => {
  counts[k] = 0;
});
DATA.forEach((t) => {
  counts[t.type] += 1;
});

export default function TypeChips({ activeSet, onToggle }) {
  const isolating = hasAnySelected(activeSet);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
      {TYPE_ORDER.map((key) => {
        const meta = TYPE_META[key];
        const isActive = isolating ? !!activeSet[key] : false;
        return (
          <span key={key} style={{ opacity: isolating && !isActive ? 0.45 : 1 }}>
            <Chips
              label={`${meta.label} ${counts[key]}`}
              isActive={isActive}
              onClick={() => onToggle(key)}
              style={isActive ? { borderColor: meta.hex, color: meta.hex } : undefined}
            />
          </span>
        );
      })}
    </div>
  );
}
