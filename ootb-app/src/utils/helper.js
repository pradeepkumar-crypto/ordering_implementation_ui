// Missing from the exported impact-ui package (both tarballs) — Table's advanced-search
// modal imports these. Standard, generic implementations restored as a stopgap so the
// library doesn't crash on import; replace with the real library file if/when it's available.

export function convertToOptions(values = []) {
  return values.map((v) =>
    v && typeof v === 'object' && 'value' in v ? v : { label: String(v), value: v }
  );
}

export function hasDuplicateColumns(columnDefs = []) {
  const fields = columnDefs.map((c) => c.field);
  return new Set(fields).size !== fields.length;
}

export const TEXT_FILTER_OPTIONS = [
  { label: 'Equals', value: 'equals' },
  { label: 'Not equal', value: 'notEqual' },
  { label: 'Contains', value: 'contains' },
  { label: 'Not contains', value: 'notContains' },
  { label: 'Starts with', value: 'startsWith' },
  { label: 'Ends with', value: 'endsWith' },
  { label: 'Blank', value: 'blank' },
  { label: 'Not blank', value: 'notBlank' },
];

export const NON_TEXT_FILTER_OPTIONS = [
  { label: 'Equals', value: 'equals' },
  { label: 'Not equal', value: 'notEqual' },
  { label: 'Greater than', value: 'greaterThan' },
  { label: 'Greater than or equal', value: 'greaterThanOrEqual' },
  { label: 'Less than', value: 'lessThan' },
  { label: 'Less than or equal', value: 'lessThanOrEqual' },
  { label: 'In range', value: 'inRange' },
  { label: 'Blank', value: 'blank' },
  { label: 'Not blank', value: 'notBlank' },
];
