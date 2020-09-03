import styled from "styled-components";
import { primary } from "@styles/theme";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const PositionContainer = styled.div`
  height: 90%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ReactCropContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  height: 40%;
  width: ${(props) => (props.background ? "80%" : "60%")};
  border: 2px dotted ${primary};
  box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.div`
  margin: 2rem 0;
  font-size: 1.2rem;
  text-align: center;
`;

export const Label = styled.label`
  width: 6rem;
  margin: 2rem auto;
  display: block;
  padding: 0.5rem 1rem;
  box-shadow: inset 0 0 0 transparent;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.2s ease-in-out, color 0.2s ease-in-out,
    border 0.2s ease-in-out;

  &:hover {
    border: 1px solid ${primary};
    color: white;
    box-shadow: inset -8rem 0 0 ${primary};
  }
`;

export const Button = styled.button`
  width: 6rem;
  margin: 2rem auto 5rem auto;
  display: block;
  padding: 0.5rem 1rem;
  box-shadow: inset 0 0 0 transparent;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.2s ease-in-out, color 0.2s ease-in-out,
    border 0.2s ease-in-out;

  &:hover {
    border: 1px solid ${primary};
    color: white;
    box-shadow: inset -8rem 0 0 ${primary};
  }
`;

export const Preview = styled.canvas`
  border: 1px solid ${primary};
  border-radius: ${(props) => (props.type === "background" ? "0" : "50%")};
  margin: 2rem auto 0 auto;
  height: ${(props) => (props.type === "background" ? "10rem " : "7rem")};
  width: ${(props) => (props.type === "background" ? "80% " : "7rem")};
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
`;
