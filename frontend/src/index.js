import React, { StrictMode } from "react";
import { render } from "react-dom";

import App from "./App";

import { Reset } from "@styles/cssReset";
import { GlobalStyle } from "@styles/globalStyle";

import { BrowserRouter as Router } from "react-router-dom";

render(
  <StrictMode>
    <Reset />
    <GlobalStyle />
    <Router>
      <App />
    </Router>
  </StrictMode>,
  document.getElementById("root")
);
