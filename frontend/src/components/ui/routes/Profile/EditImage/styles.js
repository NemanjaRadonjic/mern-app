import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PositionContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ReactCropContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  height: 10rem;
  width: ${(props) => (props.type === "background" ? "80%" : "40%")};
  border: 2px solid rgb(${(props) => props.theme.primary});
  box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.div`
  margin: 2rem 0;
  font-size: 1.2rem;
  text-align: center;
`;

export const Label = styled.label`
  width: 6rem;
  margin: 1rem auto;
  display: block;
  padding: 0.5rem 1rem;
  box-shadow: inset 0 0 0 transparent;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.2s ease-in-out, color 0.2s ease-in-out,
    border 0.2s ease-in-out;

  &:hover {
    border: 1px solid rgb(${(props) => props.theme.primary});
    color: white;
    box-shadow: inset -8rem 0 0 rgb(${(props) => props.theme.primary});
  }
`;

export const Button = styled.button`
  width: 6rem;
  margin: 1rem auto 1rem auto;
  display: block;
  padding: 0.5rem 1rem;
  box-shadow: inset 0 0 0 transparent;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.2s ease-in-out, color 0.2s ease-in-out,
    border 0.2s ease-in-out;

  &:hover {
    border: 1px solid rgb(${(props) => props.theme.primary});
    color: white;
    box-shadow: inset -8rem 0 0 rgb(${(props) => props.theme.primary});
  }
`;
