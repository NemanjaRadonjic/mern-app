import styled from "styled-components";

export const Container = styled.div`
  background-image: linear-gradient(
      to right,
      rgba(${(props) => props.theme.background}, 0.7),
      rgba(${(props) => props.theme.background}, 0.4)
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

export const Background = styled.div`
  width: 100%;
  min-height: ${(props) => (props.post ? "7rem" : "5rem")};
  padding: 1.5rem 1.5rem 0 1.5rem;
  display: flex;
  background: rgba(${(props) => props.theme.background}, 0.3);
  transition: background 0.4s ease-in-out;
  &:hover {
    background: rgba(${(props) => props.theme.background}, 0);
  }
`;

export const AvatarContainer = styled.div`
  width: 2rem;
  margin-left: 1rem;
`;

export const Author = styled.div`
  font-weight: bold;
  width: 10rem;
  margin: ${(props) => (props.post ? "1rem" : "0 1rem")};
`;
export const Head = styled.div`
  width: 100%;
  letter-spacing: 0.5px;
  font-size: 1.05rem;
  margin-bottom: 3rem;
`;

export const Info = styled.div`
  display: flex;
  margin-left: 1rem;
  align-items: center;
`;
export const Time = styled.div`
  color: rgb(${(props) => props.theme.lightText});
`;

export const VoteContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 0.5rem;

  display: flex;
  justify-content: space-between;

  float: right;
`;

export const ItemContainer = styled.div`
  display: flex;
  &:hover {
    color: rgb(${(props) => props.theme.primary});
  }
`;

export const Count = styled.div`
  margin: auto;
  width: 1.5rem;
  color: inherit;
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

export const Settings = styled.div`
  position: absolute;
  border-radius: 4px;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.3rem 0.5rem;
  width: 4rem;
  display: flex;
  justify-content: space-around;
`;

export const Setting = styled.i`
  font-size: 1.15rem;
  padding: 0.5rem;
  border-radius: 4px;
  color: rgb(${(props) => props.theme.text});
  transition: background 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    background: rgba(${(props) => props.theme.text}, 0.2);
    color: rgb(${(props) => props.theme.primary});
  }
`;
