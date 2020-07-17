import React, { StrictMode } from "react";
import { render } from "react-dom";

import App from "./App";

import { Reset } from "@styles/cssReset";
import { GlobalStyle } from "@styles/globalStyle";

import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";
import { createStore } from "redux";

import reducers from "./store/reducers";

import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(reducers, composeWithDevTools());

render(
  <StrictMode>
    <Reset />
    <GlobalStyle />
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </StrictMode>,
  document.getElementById("root")
);
