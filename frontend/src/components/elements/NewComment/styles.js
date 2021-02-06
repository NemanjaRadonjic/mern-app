import styled from "styled-components";

export const TextArea = styled.textarea`
  width: 90%;
  padding: 0.5rem;
  margin-left: 1.5rem;
  margin-top: 0.5rem;
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

export const Avatar = styled.img`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
`;

export const NewCommentHead = styled.div`
  width: 100%;
  letter-spacing: 0.5px;
  font-size: 1.05rem;
  margin-bottom: 0.26rem;
`;

export const Button = styled.button`
  position: absolute;
  right: 1.5rem;
  bottom: 0.8rem;
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
  box-shadow: inset 0 0 0 rgb(${(props) => props.theme.primary});
  cursor: pointer;

  transition: box-shadow 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    color: white;
    box-shadow: inset 0 -3rem 0 rgb(${(props) => (props.disabled ? props.theme.lightText : props.theme.primary)});
  }
`;
