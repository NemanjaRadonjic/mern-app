import { css, createGlobalStyle } from "styled-components";

import { textDark, primary } from "./theme";

export const globalStyles = css`
  html {
    font-family: "Baloo Da 2", cursive;
    color: ${textDark};
  }

  * {
    color: ${textDark};
    outline: none;
  }

  a:-webkit-any-link {
    text-decoration: none;
    height: inherit;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    transition: color 0.1s ease-in-out;

    &:hover {
      color: ${primary};
    }
  }
`;

export const GlobalStyle = createGlobalStyle`${globalStyles}`;
