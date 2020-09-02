import styled from "styled-components";

import { primary } from "@styles/theme";

export const PostContainer = styled.div`
  display: flex;
  max-width: 100%;
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
  overflow: hidden;
`;

export const Title = styled.div``;

export const Author = styled.div`
  font-weight: bold;
`;

export const Time = styled.div`
  color: grey;
`;

export const VoteContainer = styled.div`
  display: flex;
  justify-content: space-between;

  float: right;
`;

export const LikeContainer = styled.div`
  display: flex;
  &:hover {
    color: ${primary};
  }
`;

export const DislikeContainer = styled.div`
  display: flex;
  &:hover {
    color: ${primary};
  }
`;

export const VoteCount = styled.div`
  margin: auto;
  width: 2.4rem;
  color: inherit;
  font-size: 1.2rem;
  transition: color 0.2s ease-in-out;
`;

export const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1.2rem;
  color: inherit;

  transition: color 0.2s ease-in-out;
`;
