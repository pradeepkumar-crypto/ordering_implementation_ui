// Missing from the exported impact-ui package (both tarballs) — Table/AgGridHeader.js
// imports this. Standard debounce, restored as a stopgap; replace with the real
// library file if/when it's available.
export function debounce(fn, wait = 250) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}
