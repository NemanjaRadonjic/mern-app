import styled from "styled-components";

import { primary } from "@styles/theme";

export const Container = styled.div`
  height: 100%;
  width: 30%;
  position: fixed;
  right: 0;
`;

export const AuthContainer = styled.div`
  margin: 1rem 2rem 0 0;
  height: 3rem;
  width: 40%;
  float: left;
  display: flex;
  justify-content: space-around;
`;

export const Name = styled.p`
  margin: auto 0;
  cursor: pointer;

  transition: color 0.1s ease-in-out;

  &:hover {
    color: ${primary};
  }
`;

export const Settings = styled.div`
  font-size: 1.5rem;
  margin: auto;
  cursor: pointer;
  color: grey;
  transition: color 0.1s ease-in-out;

  &:hover {
    color: ${primary};
  }
`;

export const Avatar = styled.img`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  margin: auto 0;
  cursor: pointer;

  transition: color 0.1s ease-in-out;

  &:hover {
    color: ${primary};
  }
`;

export const Button = styled.a`
  margin: auto;
  font-size: inherit;
  font-family: inherit;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.1s ease-in-out;

  &:hover {
    color: ${primary};
  }
`;

export const LinkContainer = styled.div`
  height: 100%;
  width: 100%;
`;