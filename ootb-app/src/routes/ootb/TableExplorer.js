import React, { useMemo } from 'react';
import { Table } from '../../components/Table';
import { DATA, TYPE_META } from '../../data/ootbData';
import { typeVisible, matchesQuery } from '../../utils/ootbLogic';

export default function TableExplorer({ activeTypes, query, onOpenTask }) {
  const rows = useMemo(
    () => DATA.filter((t) => typeVisible(activeTypes, t.type) && matchesQuery(t, query)),
    [activeTypes, query]
  );

  const columnDefs = useMemo(
    () => [
      { field: 'name', headerName: 'Task', isSearchable: true, flex: 2 },
      { field: 'usage', headerName: 'Purpose', flex: 2 },
      {
        field: 'type',
        headerName: 'Type',
        flex: 1,
        cellRenderer: (params) => {
          const meta = TYPE_META[params.value];
          return (
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 6,
                color: '#fff',
                background: meta.hex,
              }}
            >
              {meta.label}
            </span>
          );
        },
      },
      { field: 'group', headerName: 'Group', flex: 1 },
    ],
    []
  );

  return (
    <Table
      tableHeader={`${rows.length} of ${DATA.length} tasks`}
      cardContainer={true}
      rowData={rows}
      columnDefs={columnDefs}
      rowHeight="default"
      onRowClicked={(e) => onOpenTask(e.data.name)}
    />
  );
}
