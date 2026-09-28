import React from "react";
import { renderAppRoot } from "./renderReactRoot";
import App from "./App";
import { CssBaseline } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";

const rootElement = document.getElementById("root");
const AppRoot = () => (
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <App />
    </StyledEngineProvider>
  </React.StrictMode>
);
// support for react 17,18,19
renderAppRoot(AppRoot, rootElement);
