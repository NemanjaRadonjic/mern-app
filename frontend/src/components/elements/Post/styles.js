import styled from "styled-components";

import { primary } from "@styles/theme";

export const PostContainer = styled.div`
  background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.4)
    ),
    url(${(props) => props.background});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  max-width: 100%;
  min-height: 7rem;
  border-bottom: 1px solid ${primary};
  cursor: pointer;
  position: relative;
`;

export const PostBackground = styled.div`
  width: 100%;
  min-height: 7rem;
  padding: 1.5rem 1.5rem 0 1.5rem;
  display: flex;
  background: rgba(255, 255, 255, 0.3);
  transition: background 0.3s ease-in-out;
  &:hover {
    background: rgba(255, 255, 255, 0);
  }
`;

export const PostHead = styled.div`
  width: 90%;
  letter-spacing: 0.5px;
  font-size: 1.05rem;
  margin-bottom: 2rem;
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
  position: absolute;
  bottom: 1rem;
  right: 0.5rem;

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
  width: 2rem;
  color: inherit;
  font-size: 1rem;
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
