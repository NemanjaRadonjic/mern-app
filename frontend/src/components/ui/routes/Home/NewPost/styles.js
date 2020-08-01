import styled from "styled-components";

import { primary } from "@styles/theme";

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${primary};
  padding: 3rem 5rem 1rem 5rem;
`;

export const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
`;

export const Avatar = styled.img`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
`;

export const TextArea = styled.textarea`
  padding: 0.5rem 1rem;
  font-size: inherit;
  font-family: inherit;
  width: 88%;
  background: none;
  resize: none;
  border: none;
  border-bottom: 1px solid ${primary};
`;

export const Error = styled.div`
  margin-left: 5rem;
  font-size: 1rem;
  color: red;
`;

export const Button = styled.button`
  float: right;
  background: ${primary};
  border: none;
  color: white;
  padding: 0.5rem 2rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  cursor: pointer;

  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.4);
  }
`;

export const Message = styled.div`
  text-align: center;
  width: 100%;
  padding: 0.5rem 0;
`;
