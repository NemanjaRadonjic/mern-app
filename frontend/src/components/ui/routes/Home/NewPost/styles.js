import styled from "styled-components";

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgb(${(props) => props.theme.primary});
  padding: 1.5rem 1rem 1.5rem 1rem;
  position: relative;
`;

export const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const BottomSection = styled.div`
  padding-top: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const Avatar = styled.img`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
`;

export const TextArea = styled.textarea`
  width: 90%;
  padding: 0.5rem;
  margin-left: 1.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  resize: none;
  font-size: 1.05rem;
  line-height: 1.2rem;
  word-spacing: 1px;
  letter-spacing: 0.5px;
  border: none;
  transition: box-shadow 0.2s ease-in-out;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

export const Error = styled.div`
  margin: auto;
  font-size: 1rem;
  color: red;
`;

export const Button = styled.button`
  width: 9.5rem;
  font-size: 1rem;
  background: transparent;
  display: block;
  padding: 0 1rem;
  color: rgb(${(props) => props.theme.text});
  border: none;
  border: 1px solid
    ${(props) =>
      props.disabled
        ? `rgba(${props.theme.primary}, 0.5)`
        : `rgb(${props.theme.primary})`};
  box-shadow: inset 0 2rem 2rem
    ${(props) =>
      props.disabled
        ? `rgba(${props.theme.primary}, 0.5)`
        : `rgb(${props.theme.primary})`};
  cursor: pointer;

  transition: box-shadow 0.3s ease-in-out, border 0.3s ease-in-out;

  &:hover {
    box-shadow: inset 0 -2rem 10rem ${(props) => (props.disabled ? `rgba(${props.theme.primary}, 0.7)` : `rgb(${props.theme.primary})`)};
  }

  &.align-center {
    margin: 0 auto;
  }
`;

export const Counter = styled.div`
  position: absolute;
  bottom: 2.5rem;
  right: 1.5rem;
  color: rgb(
    ${(props) => (props.filled ? props.theme.primary : props.theme.text)}
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
