import { css, createGlobalStyle } from "styled-components";

import { textDark } from "./theme";

export const globalStyles = css`
  html {
    font-family: "Baloo Da 2", cursive;
    color: ${textDark};
  }

  * {
    color: ${textDark};
  }
`;

export const GlobalStyle = createGlobalStyle`${globalStyles}`;
