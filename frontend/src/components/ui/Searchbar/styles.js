import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 30%;
  position: fixed;
  left: 0;
`;

export const InputContainer = styled.div`
  background: red;
`;

export const Input = styled.input`
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

export const SearchIcon = styled.i`
  position: absolute;
  top: 1.7rem;
  right: 0.5rem;
  color: gray;
`;

export const ChangeTheme = styled.i`
  color: rgb(${(props) => props.theme.primary});
  font-size: 2rem;
  margin: 1.3rem 2rem;
  cursor: pointer;
`;
