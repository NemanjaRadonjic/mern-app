import React, { StrictMode } from "react";
import { render } from "react-dom";

import App from "./App";

import { Reset } from "./styles/cssReset";
import { GlobalStyle } from "./styles/globalStyle";

render(
  <StrictMode>
    <Reset />
    <GlobalStyle />
    <App />
  </StrictMode>,
  document.getElementById("root")
);
