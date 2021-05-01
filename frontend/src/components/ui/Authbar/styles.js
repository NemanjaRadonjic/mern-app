import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 30%;
  position: fixed;
  right: 0;

  @media (max-width: 1700px) {
    width: 28%;
  }

  @media (max-width: 1600px) {
    width: 26%;
  }

  @media (max-width: 1500px) {
    width: 27%;
  }

  @media (max-width: 1400px) {
    width: 22%:
  }

  @media (max-width: 1300px) {
    width: 28%;
  }

  @media (max-width: 1200px) {
    width: 30%;
  }

  @media (max-width: 1100px) {
    width: 28%;
  }

  @media (max-width: 1000px) {
    width: 50%;
    height: 4rem;
    display: inline;
    background: rgb(${(props) => props.theme.background});
  }

  @media (max-width: 600px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 4rem;
    bottom: 0;
    background: rgb(${(props) => props.theme.background});
    box-shadow: 0 -3px 10px rgb(0, 0, 0, 0.2);
  }
`;

export const AuthContainer = styled.div`
  margin-top: 1rem;
  height: 5rem;
  width: 10rem;
  float: left;
  display: flex;
  justify-content: space-around;

  @media (max-width: 1000px) {
    margin-top: -0.5rem;
    margin-right: 2rem;
    float: right;
    flex-direction: row-reverse;
  }

  @media (max-width: 600px) {
    float: none;
    margin: 0;
    align-items: center;
  }
`;

export const Name = styled.p`
  cursor: pointer;
  transition: color 0.1s ease-in-out;

  &:hover {
    color: rgb(${(props) => props.theme.primary});
  }

  @media (max-width: 600px) {
    margin-left: 0.5rem;
    order: 1;
  }
`;

export const Settings = styled.div`
  font-size: 1.5rem;
  margin: auto;
  cursor: pointer;
  color: rgb(${(props) => props.theme.text});
  transition: color 0.1s ease-in-out;

  &:hover {
    color: rgb(${(props) => props.theme.primary});
  }
  @media (max-width: 600px) {
    order: 3;
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
    color: rgb(${(props) => props.theme.primary});
  }
  @media (max-width: 600px) {
    order: 2;
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

  &:hover,
  &:focus,
  &:active {
    color: rgb(${(props) => props.theme.primary});
  }
`;

export const LinkContainer = styled.div`
  height: 100%;
  width: 100%;
  transition: color 0.2s ease-in-out;
  font-size: 1.1rem;

  &:hover {
    color: rgb(${(props) => props.theme.primary});
  }
`;
