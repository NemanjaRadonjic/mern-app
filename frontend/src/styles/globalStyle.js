import { css, createGlobalStyle } from "styled-components";

import { textDark, primary, backgroundWhite } from "@styles/theme";

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

  .Toastify__toast--error {
    background: ${backgroundWhite};
  }
  .Toastify__toast-body {
    color: ${primary};
    text-align: center;
  }

  .Toastify__close-button > svg {
    fill: ${primary};
  }
  .Toastify__close-button:hover > svg,
  .Toastify__close-button:focus > svg {
    fill: ${textDark};
  }
  .Toastify__progress-bar {
    background: ${primary};
  }
  .fa-thumbs-down {
    transform: translateY(0.13rem);
  }
  .fa-thumbs-up {
    transform: translateY(-0.13rem);
  }
  .ReactCrop > div:first-child {
    width: 100%;
    height: 100%;
  }
  .ReactCrop__image {
    max-width: 100%;
    max-height: 100%;
  }

  .ReactCrop__crop-selection {
    border: 2px dotted ${primary};
    border-radius: 50%;
  }
  input[type="file"] {
    display: none;
  }
`;

export const GlobalStyle = createGlobalStyle`${globalStyles}`;
