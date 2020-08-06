import styled from "styled-components";

import { primary } from "@styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const PostSection = styled.div`
  display: flex;
  max-width: 100%;
  height: 10%;
  padding: 1rem;
  border-bottom: 1px solid ${primary};
  transition: background 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background: rgb(255, 225, 225);
  }
`;
export const PostHead = styled.div`
  width: 90%;
`;
export const PostInfo = styled.div`
  display: flex;
  margin-left: 1rem;
  justify-content: space-between;
  width: 40%;
`;

export const PostContent = styled.div`
  margin: 1rem 2rem;
  width: 90%;
`;

export const Title = styled.div``;

export const Author = styled.div`
  font-weight: bold;
`;

export const Date = styled.div`
  color: grey;
`;

export const CommentSection = styled.div`
  background: grey;
  width: 100%;
  height: 90%;
`;
