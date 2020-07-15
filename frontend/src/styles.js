import styled from "styled-components";

import { backgroundWhite } from "./styles/theme";

export const MainContainer = styled.div`
  display: flex;
  background: ${backgroundWhite};
  height: 100vh;
  width: 100vw;
`;

export const RoutesContainer = styled.div`
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  height: 100%;
  width: 40%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
