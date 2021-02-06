import styled from "styled-components";

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgb(${(props) => props.theme.primary});
  padding: 3rem 5rem 3rem 5rem;
`;

export const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  flex-direction: column;
`;

export const Avatar = styled.img`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
`;

export const TextArea = styled.textarea`
  padding: 0.5rem 1rem;
  font-size: inherit;
  font-family: inherit;
  width: 88%;
  background: none;
  resize: none;
  border: none;
  border-bottom: 1px solid
    rgb(
      ${(props) =>
        props.notValid ? props.theme.lightText : props.theme.primary}
    );

  transition: border 0.5s ease-in-out;
`;

export const Error = styled.div`
  margin-left: 5rem;
  font-size: 1rem;
  color: red;
`;

export const Button = styled.button`
  bottom: 1rem;
  width: 8rem;
  font-size: 1rem;
  background: transparent;
  display: block;
  padding: 0 1rem;
  border: 1px solid
    rgb(
      ${(props) =>
        props.disabled ? props.theme.lightText : props.theme.primary}
    );
  box-shadow: inset 0 0 0
    rgb(
      ${(props) =>
        props.disabled ? props.theme.lightText : props.theme.primary}
    );
  cursor: pointer;

  transition: box-shadow 0.2s ease-in-out, color 0.2s ease-in-out,
    border 0.5s ease-in-out;

  &:hover {
    color: white;
    box-shadow: inset 0 -3rem 0 rgb(${(props) => (props.disabled ? props.theme.lightText : props.theme.primary)});
  }

  &.align-center {
    margin: 0 auto;
  }
`;

export const Counter = styled.div`
  color: rgb(
    ${(props) => (props.filled ? props.theme.primary : props.theme.lightText)}
  );

  transition: color 0.5s ease-in-out;
`;

export const Message = styled.div`
  margin: auto;
  padding: 0.5rem 0;
  color: rgb(${(props) => props.theme.lightText});
  font-size: 1.1rem;
`;

export const RedirectLink = styled.div`
  margin: auto;
  padding: 0.5rem 0;
  text-decoration: underline;
  &:hover {
    color: rgb(${(props) => props.theme.primary});
  }
`;
