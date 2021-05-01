import styled from "styled-components";

export const ThemeMenuContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: absolute;
  padding-top: 4rem;
  width: 7rem;
  box-shadow: 0 3px 10px rgb(0, 0, 0, 0.2);
  transition: box-shadow 0.2s ease-in-out;
  background: rgb(${(props) => props.theme.background});

  &:hover {
    box-shadow: 0 3px 10px rgb(0, 0, 0, 0.1);
  }
`;

export const Header = styled.div`
  font-weight: 500;
  text-align: center;
  margin-bottom: 1rem;
`;

export const Mode = styled.div`
  color: rgb(${(props) => props.color});
  margin: 1rem 0;
  cursor: pointer;
  text-align: center;
  padding: 0.5rem 0;
  box-shadow: inset 2px 0 1px rgb(${(props) => props.theme.text});
  transition: box-shadow 0.2s ease-in-out, color 0.3s ease-in-out;

  &:hover {
    box-shadow: inset 12rem 0 0 rgb(${(props) => props.theme.text});
  }
`;

export const Accent = styled.div`
  border: 5px solid
    rgb(
      ${(props) => (props.active ? props.theme.text : props.theme.background)}
    );
  background: rgb(${(props) => props.color});
  margin: 0.5rem auto;
  height: 4.5rem;
  width: 80%;
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 0 3px 10px rgb(0, 0, 0, 0.2);
  transition: box-shadow 0.2s ease-in-out, border-radius 0.2s ease-in-out,
    border 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 3px 10px rgb(0, 0, 0, 0.1);
    border-radius: 4px;
  }

  @media (max-height: 814px) {
    height: 3.2rem;
  }
`;
