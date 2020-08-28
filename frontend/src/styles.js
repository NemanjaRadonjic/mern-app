import styled from "styled-components";

import { backgroundWhite } from "@styles/theme";

export const MainContainer = styled.div`
  display: flex;
  background: ${backgroundWhite};
  width: 100%;
`;

export const RoutesContainer = styled.div`
  margin: auto;
  min-height: 100vh;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  width: 35%;
  align-items: center;
`;
