import styled from "styled-components";
import { primary, backgroundWhite } from "@styles/theme";

export const Avatars = styled.div`
  width: 45%;
  margin-top: 3rem;
  float: left;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

export const Avatar = styled.img`
  width: 5rem;
  height: 5rem;
  margin: 1rem;
  border: 4px solid ${backgroundWhite};
  box-shadow: 0 3px 10px rgb(0, 0, 0, 0.3);
  border-radius: 50%;
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 3px 10px rgb(0, 0, 0, 0.4);
  }

  &:focus {
    box-shadow: 0 3px 10px rgb(0, 0, 0, 0.4);
  }
`;

export const Backgrounds = styled.div`
  width: 45%;
  margin-top: 3rem;
  float: right;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
`;

export const Background = styled.img`
  width: 15rem;
  height: 5rem;
  margin: 1rem;
  border: 10px solid transparent;
  box-shadow: 0 3px 10px rgb(0, 0, 0, 0.3);
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 3px 10px rgb(0, 0, 0, 0.4);
  }

  &:focus {
    box-shadow: 0 3px 10px rgb(0, 0, 0, 0.4);
  }
`;

export const Header = styled.div`
  width: 100%;
  text-align: center;
  color: grey;
`;
