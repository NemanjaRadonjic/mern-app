import styled from "styled-components";

import { primary } from "./theme";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

export const Header = styled.div`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 3rem;
  color: ${primary};
`;

export const Input = styled.input`
  width: 60%;
  margin: 1rem auto;
  font-size: 1.1rem;
  padding: 0.3rem 1rem;
  border: none;
  border-bottom: 2px solid ${primary};
`;

export const Message = styled.div`
  cursor: pointer;
  margin: 3rem auto 1rem auto;
  text-decoration: underline;
  &:hover {
    color: ${primary};
  }
`;

export const Button = styled.button`
  font-size: 1.2rem;
  width: 50%;
  margin: 1rem auto;
  background: ${primary};
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  cursor: pointer;

  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  }
`;
