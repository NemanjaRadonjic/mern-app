import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 30%;
  position: fixed;
  display: flex;
  justify-content: space-between;

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
    background: rgb(${(props) => props.theme.background});
  }

  @media (max-width: 600px) {
    width: 100%;
    height: 4rem;
    background: rgb(${(props) => props.theme.background});
  }
`;

export const SearchContainer = styled.div`
  width: 16rem;
  position: absolute;
  margin-top: 1.6rem;
  right: 0;

  @media (max-width: 1500px) {
    width: 15rem;
  }

  @media (max-width: 1400px) {
    width: 14rem;
  }

  @media (max-width: 1300px) {
    width: 14rem;
  }

  @media (max-width: 1200px) {
    width: 13rem;
  }

  @media (max-width: 1100px) {
    width: 10rem;
  }

  @media (max-width: 1000px) {
    width: 12rem;
    left: 8rem;
    margin-top: 0.5rem;
  }

  @media (max-width: 600px) {
    left: 45%;
  }
`;

export const SearchbarContainer = styled.div`
  width: 100%;
  position: relative;
  float: right;
`;

export const SearchResultContainer = styled.div`
  background: rgb(${(props) => props.theme.background});
  box-shadow: 0 3px 10px rgb(0, 0, 0, 0.2);
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 3px 10px rgb(0, 0, 0, 0.1);
  }

  &:focus {
    box-shadow: 0 3px 10px rgb(0, 0, 0, 0.1);
  }
`;

export const Avatar = styled.img`
  border-radius: 50%;
  height: 2.8rem;
  width: 2.8rem;
  box-shadow: 0 3px 10px rgb(0, 0, 0, 0.2);
`;

export const Username = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;

export const Input = styled.input`
  width: calc(100% - 3rem - 1px);
  position: relative;
  font-size: 1.1rem;
  padding: 0.5rem 2rem 0.5rem 1rem;
  border: none;
  border-left: 1px solid rgb(${(props) => props.theme.primary});
  background-color: transparent;
  box-shadow: 0 3px 10px rgb(0, 0, 0, 0.2);
  transition: box-shadow 0.2s ease-in-out, border 0.3s ease-in-out;

  @media (max-width: 1000px) {
    box-shadow: 0 3px 10px rgb(0, 0, 0, 0.1);
  }

  &:hover {
    box-shadow: 0 3px 10px rgb(0, 0, 0, 0.1);
  }

  &:focus {
    box-shadow: 0 3px 10px rgb(0, 0, 0, 0.1);
  }
`;

export const BackgroundContainer = styled.div`
  width: 100%;
  background-image: linear-gradient(
      to right,
      rgba(${(props) => props.theme.background}, 0.7),
      rgba(${(props) => props.theme.background}, 0.4)
    ),
    url(${(props) => props.backgroundImageUrl});
  background-size: cover;
  overflow: hidden;
`;

export const LinkContainer = styled.div`
  border-left: 1px solid rgb(${(props) => props.theme.primary});
  display: flex;
  padding: 1rem 1rem;
  width: calc(100% - 2rem);
  background: rgba(
    ${(props) => props.theme.background},
    ${(props) => (props.mode === "light" ? "0.2" : "0.8")}
  );
  transition: background 0.3s ease-in-out, color 0.2s ease-in-out,
    border 0.2s ease-in-out;

  &:hover {
    border-left: 3px solid rgb(${(props) => props.theme.primary});
    background: rgba(
      ${(props) => props.theme.background},
      ${(props) => (props.mode === "light" ? "0" : "0.6")}
    );
    color: rgb(${(props) => props.theme.primary});
  }
`;

export const SearchIcon = styled.i`
  position: absolute;
  top: 0.95rem;
  right: 1rem;
  color: gray;
`;

export const ChangeTheme = styled.i`
  position: absolute;
  color: rgb(${(props) => props.theme.primary});
  height: 3rem;
  font-size: 2rem;
  margin: 2rem 2.5rem;
  cursor: pointer;
  z-index: 1000;

  @media (max-width: 1000px) {
    margin: 1rem 2.5rem;
  }
`;
