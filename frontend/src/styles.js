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
  overflow: hidden;
`;

export const BackToHome = styled.div`
  font-size: 1.2rem;
  border-bottom: 1px solid rgb(${(props) => props.theme.primary});
  height: 3rem;
  font-weight: bold;
  letter-spacing: 1px;
  color: rgb(${(props) => props.theme.lightText});
  transition: color 0.2s ease-in-out;

  &:hover {
    color: rgb(${(props) => props.theme.primary});
  }
`;
