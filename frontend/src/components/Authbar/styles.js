import styled from "styled-components";

import { primary } from "../../styles/theme";

export const Container = styled.div`
  height: 100%;
  width: 30%;
`;

export const AuthContainer = styled.div`
  margin: 1rem 2rem 0 0;
  height: 2.5rem;
  width: 30%;
  float: right;
  display: flex;
  justify-content: space-around;
`;

export const Name = styled.p`
  margin: auto 0;
  cursor: pointer;

  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${primary};
  }
`;

export const Settings = styled.div`
  font-size: 1.5rem;
  height: 1.5rem;
  margin: auto 0;
  cursor: pointer;
  color: ${primary};
`;

export const Avatar = styled.i`
  font-size: 2rem;
  height: 2rem;
  margin: auto 0;
  cursor: pointer;
  color: ${primary};
`;
