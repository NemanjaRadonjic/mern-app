import { css, createGlobalStyle } from "styled-components";

export const globalStyles = css`
  html {
    font-family: "Baloo Da 2", cursive;
    color: rgb(${(props) => props.theme.text});
    overflow-y: scroll;
  }

  * {
    color: rgb(${(props) => props.theme.text}));
    outline: none;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgb(${(props) => props.theme.background});
  }

  ::-webkit-scrollbar-thumb {
    background: grey;
    border-radius: 8px;
    transition: background 0.2s ease-in-out;

    &:hover {
      background: rgb(${(props) => props.theme.primary});
    }
  }

  a:-webkit-any-link {
    text-decoration: none;
    height: 100%;
    padding-left: 1rem;
    width: 100%;
    display: flex;
    align-items: center;
    color: inherit;

    &.text-align__center {
      justify-content: space-around;
      padding-left: 0;
    }
  }

  .Toastify__toast--error {
    background: rgb(${(props) => props.theme.background});
  }
  .Toastify__toast-body {
    color: rgb(${(props) => props.theme.primary});
    text-align: center;
  }

  .Toastify__close-button > svg {
    fill: rgb(${(props) => props.theme.primary});
  }
  .Toastify__close-button:hover > svg,
  .Toastify__close-button:focus > svg {
    fill: rgb(${(props) => props.theme.text});
  }
  .Toastify__progress-bar {
    background: rgb(${(props) => props.theme.primary});
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
    border: 2px dotted rgb(${(props) => props.theme.primary});;
  }
  input[type="file"] {
    display: none;
  }
  .NavLink-active {
    transition: box-shadow 0.2s ease-in-out;
    box-shadow: inset 0 -5.4rem 0 rgb(${(props) => props.theme.primary});;
  }
`;

export const GlobalStyle = createGlobalStyle`${globalStyles}`;
