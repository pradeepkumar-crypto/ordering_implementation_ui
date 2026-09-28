import React from "react";

let portalRenderer = null;

export async function renderAppRoot(Component, rootElement) {
  if (!rootElement) throw new Error("Root element not found");

  try {
    // Try React 18/19 (createRoot)
    const { createRoot } = await import("react-dom/client");
    const root = createRoot(rootElement);
    root.render(<Component />);
  } catch {
    // Fallback to React 17
    const ReactDOM = await import("react-dom");
    if (ReactDOM.render) {
      ReactDOM.render(<Component />, rootElement);
    } else {
      throw new Error("No supported render method found");
    }
  }
}

export async function renderPortal(children, container) {
  if (!container) return null;

  if (!portalRenderer) {
    const ReactDOM = await import("react-dom");
    portalRenderer = ReactDOM.createPortal;
  }

  return portalRenderer(children, container);
}
