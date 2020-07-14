import styled from "styled-components";

import { primary } from "../../styles/theme";

export const Container = styled.div`
  height: 100%;
  width: 30%;
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  margin: 1rem auto 0 auto;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  border: none;
  border: 2px solid ${primary};
  background-color: transparent;
  box-shadow: inset 0 0px 0px rgb(0, 0, 0, 0.2);
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: inset 0 3px 10px rgb(0, 0, 0, 0.1);
  }

  &:focus {
    box-shadow: inset 0 3px 10px rgb(0, 0, 0, 0.1);
  }
`;
