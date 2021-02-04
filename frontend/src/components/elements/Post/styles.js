import styled from "styled-components";

export const PostContent = styled.div`
  margin: 1rem;
  font-size: 1.1rem;
  line-height: 1.2rem;
  word-spacing: 1px;
  padding: 0.5rem;
  white-space: pre-line;
`;

export const EditForm = styled.form`
  width: 100%;
  background: blue;
`;

export const EditContainer = styled.div`
  margin: 1rem;
  padding: 0.5rem;
`;

export const TextArea = styled.textarea`
  position: absolute;
  width: 85%;
  padding: 0.5rem;
  margin-left: -0.5rem;
  margin-top: -0.5rem;
  resize: none;
  font-size: 1.1rem;
  line-height: 1.2rem;
  word-spacing: 1px;
  letter-spacing: 0.5px;
  border: none;
  transition: box-shadow 0.2s ease-in-out;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

export const Button = styled.button`
  position: absolute;
  left: 2.5rem;
  bottom: 1rem;
  width: 8rem;
  font-size: 1rem;
  background: transparent;
  display: block;
  padding: 0 1rem;
  border: 1px solid rgb(${(props) => props.theme.primary});
  box-shadow: inset 0 0 0 rgb(${(props) => props.theme.primary});
  cursor: pointer;

  transition: box-shadow 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    color: white;
    box-shadow: inset 0 -3rem 0 rgb(${(props) => props.theme.primary});
  }

  &.align-center {
    margin: 0 auto;
  }
`;

export const Counter = styled.div`
  position: absolute;
  bottom: 2.7rem;
  right: 1.5rem;
`;
