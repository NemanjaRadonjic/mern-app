import styled from "styled-components";

export const BackgroundContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  background: rgba(${(props) => props.theme.background}, 0.8);
  height: 100vh;
  width: 100vw;
  z-index: 100;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20rem;
`;

export const Message = styled.p`
  font-size: 1.2rem;
  color: ${(props) =>
    props.danger ? `rgb(${props.theme.primary})` : "inherit"};
  text-align: center;
`;
