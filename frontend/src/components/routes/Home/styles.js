import styled from "styled-components";
import { primary } from "@styles/theme";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
`;

export const PostContainer = styled.div`
  border: 2px solid ${primary};
  max-width: 100%;
  padding: 1rem;
  margin-top: 1rem;
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
