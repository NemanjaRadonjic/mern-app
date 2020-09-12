import styled from "styled-components";

export const CommentContent = styled.div`
  margin: 1rem 2rem 0 ${(props) => (props.post ? "2rem" : "2.5rem")};
  overflow: hidden;
`;
