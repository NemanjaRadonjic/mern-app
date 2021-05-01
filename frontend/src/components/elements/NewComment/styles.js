import styled from "styled-components";

export const Container = styled.div`
  background-image: linear-gradient(
      to right,
      rgba(
        ${(props) => props.theme.background},
        ${(props) => (props.mode === "light" ? "0.2" : "0.8")}
      ),
      rgba(
        ${(props) => props.theme.background},
        ${(props) => (props.mode === "light" ? "0.2" : "0.8")}
      )
    ),
    url(${(props) => props.background});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  max-width: 100%;
  min-height: 7rem;
  border-bottom: 1px solid rgb(${(props) => props.theme.primary});
  cursor: pointer;
  position: relative;
`;

export const TextArea = styled.textarea`
  width: 90%;
  padding: 0.5rem;
  margin-left: 1.5rem;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
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

export const Counter = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  color: rgb(
    ${(props) => (props.filled ? props.theme.primary : props.theme.text)}
  );

  transition: color 0.5s ease-in-out;
`;
