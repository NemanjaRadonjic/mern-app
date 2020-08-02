import styled from "styled-components";

import { primary } from "@styles/theme";

export const PostContainer = styled.div`
  display: flex;
  max-width: 100%;
  padding: 1rem;
  border-bottom: 1px solid ${primary};
`;
export const PostHead = styled.div`
  width: 90%;
`;
export const PostInfo = styled.div`
  display: flex;
  justify-content: space-around;
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
