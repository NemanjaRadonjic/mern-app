import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  background: rgb(${(props) => props.theme.background});
  width: 100%;
  transition: background 0.4s ease-in-out;
`;

export const RoutesContainer = styled.div`
  margin: auto;
  min-height: 100vh;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  width: 35%;
  align-items: center;
`;
