import styled from "styled-components";

export const BackgroundContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  background: rgba(255, 255, 255, 0.7);
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

export const Button = styled.button`
  cursor: pointer;
  margin: 0.5rem auto;
  font-size: 1.1rem;
  padding: 0 1rem;
`;
