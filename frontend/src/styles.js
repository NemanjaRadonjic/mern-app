import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  background: rgb(${(props) => props.theme.background});
  width: 100%;
  transition: background 0.4s ease-in-out;
`;

export const RoutesContainer = styled.div`
  margin: auto;
  min-height: calc(100vh - 3rem);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  width: 40rem;
  align-items: center;
  overflow: hidden;

  @media (max-width: 1500px) {
    width: 35rem;
  }

  @media (max-width: 1300px) {
    width: 30rem;
  }

  @media (max-width: 1200px) {
    width: 25rem;
  }

  @media (max-width: 1000px) {
    width: 100%;
    margin-top: 4rem;
  }

  @media (max-width: 600px) {
    margin-bottom: 4rem;
  }
`;

export const BackToHome = styled.div`
  font-size: 1.2rem;
  border-bottom: 1px solid rgb(${(props) => props.theme.primary});
  background: rgb(${(props) => props.theme.background});
  height: 3rem;
  font-weight: bold;
  letter-spacing: 1px;
  color: rgb(${(props) => props.theme.lightText});
  transition: color 0.2s ease-in-out, border 0.3s ease-in-out,
    background 0.4s ease-in-out;
  position: sticky;
  width: 40rem;
  top: 0;
  box-shadow: 0 0.5rem 10px -3px rgba(0, 0, 0, 0.2);

  &:hover {
    color: rgb(${(props) => props.theme.primary});
  }

  @media (max-width: 1500px) {
    width: 35rem;
  }

  @media (max-width: 1300px) {
    width: 30rem;
  }

  @media (max-width: 1200px) {
    width: 25rem;
  }

  @media (max-width: 1000px) {
    width: 100vw;
  }
`;
