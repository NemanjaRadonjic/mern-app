import styled from "styled-components";

export const CommentContent = styled.div`
  margin: 1rem 2rem 0 ${(props) => (props.post ? "2rem" : "2.5rem")};
  overflow: hidden;
  font-size: 1.05rem;
  margin: 1rem;
  line-height: 1.2rem;
  word-spacing: 1px;
  padding: 0.5rem;
  white-space: pre-line;
`;
