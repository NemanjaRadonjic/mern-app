import styled from "styled-components";

import { primary } from "@styles/theme";

export const PostContainer = styled.div`
  max-width: 100%;
  padding: 1rem;
  border-bottom: 1px solid ${primary};
`;
export const PostHead = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const PostInfo = styled.div`
  display: flex;
  justify-content: space-around;
  width: 30%;
`;

export const PostContent = styled.div`
  margin-top: 2rem;
`;

export const Title = styled.div``;

export const Author = styled.div``;

export const Date = styled.div``;
