import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid rgb(${(props) => props.theme.primary});
  padding: 1rem 0.5rem;
`;

export const TextArea = styled.textarea`
  margin-left: 1.5rem;
  padding: 0.5rem 1rem;
  font-size: inherit;
  font-family: inherit;
  width: 50%;
  background: none;
  resize: none;
  border: none;
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

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`;
