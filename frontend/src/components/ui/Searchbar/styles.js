import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 30%;
  position: fixed;
  left: 0;
  display: flex;
  justify-content: space-between;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

export const SearchResultContainer = styled.div`
  border-left: 1px solid rgb(${(props) => props.theme.primary});

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
  color: inherit;
`;

export const Input = styled.input`
  width: calc(100% - 3rem - 1px);
  position: relative;
  float: right;
  margin: 1rem auto 0 auto;
  font-size: 1.1rem;
  padding: 0.5rem 2rem 0.5rem 1rem;
  border: none;
  border-left: 1px solid rgb(${(props) => props.theme.primary});
  background-color: transparent;
  box-shadow: 0 3px 10px rgb(0, 0, 0, 0.2);
  transition: box-shadow 0.2s ease-in-out;

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
`;

export const LinkContainer = styled.div`
  display: flex;
  padding: 1rem 1rem;
  width: calc(100% - 2rem);
  background: rgba(255, 255, 255, 0.2);

  transition: background 0.3s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    background: rgba(255, 255, 255, 0);
    color: rgb(${(props) => props.theme.primary});
  }
`;

export const SearchIcon = styled.i`
  position: absolute;
  top: 1.9rem;
  right: 1.2rem;
  color: gray;
`;

export const ChangeTheme = styled.i`
  color: rgb(${(props) => props.theme.primary});
  font-size: 2rem;
  margin: 1.3rem 2rem;
  cursor: pointer;
`;
