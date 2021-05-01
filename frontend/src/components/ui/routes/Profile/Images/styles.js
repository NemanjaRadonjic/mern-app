import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  padding-top: 3rem;
  justify-content: space-around;

  @media (max-width: 1000px) {
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const Avatars = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

export const Avatar = styled.img`
  width: 5rem;
  height: 5rem;
  margin: 1rem;
  border: 4px solid rgb(${(props) => props.theme.background});
  box-shadow: 0 3px 10px rgb(0, 0, 0, 0.3);
  border-radius: 50%;
  transition: box-shadow 0.2s ease-in-out, border 0.4s ease-in-out;

  &:hover {
    box-shadow: 0 3px 10px rgb(0, 0, 0, 0.4);
  }

  &:focus {
    box-shadow: 0 3px 10px rgb(0, 0, 0, 0.4);
  }
`;

export const Backgrounds = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
`;

export const Background = styled.img`
  width: 12rem;
  height: 4rem;
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
