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

export const PostContent = styled.div`
  margin: 1rem;
  font-size: 1.1rem;
  line-height: 1.2rem;
  word-spacing: 1px;
  padding: 0.5rem;
  white-space: pre-line;
`;

export const EditContainer = styled.div`
  margin: 1rem;
  padding: 0.5rem;
`;

export const TextArea = styled.textarea`
  position: absolute;
  width: ${(props) => (props.comment ? "77%" : "85%")};
  padding: 0.5rem;
  margin-left: -0.5rem;
  margin-top: -0.5rem;
  resize: none;
  font-size: ${(props) => (props.comment ? "1.05rem" : "1.1rem")};
  line-height: 1.2rem;
  word-spacing: 1px;
  letter-spacing: 0.5px;
  border: none;
  transition: box-shadow 0.2s ease-in-out;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

export const Button = styled.button`
  position: absolute;
  left: 2.5rem;
  bottom: 1rem;
  width: 8rem;
  font-size: 1rem;
  background: transparent;
  display: block;
  padding: 0 1rem;

  border: 1px solid
    rgb(
      ${(props) =>
        props.disabled ? props.theme.lightText : props.theme.primary}
    );
  box-shadow: inset 0 0 0 rgb(${(props) => props.theme.primary});
  cursor: pointer;

  transition: box-shadow 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    color: white;
    box-shadow: inset 0 -3rem 0 rgb(${(props) => (props.disabled ? props.theme.lightText : props.theme.primary)});
  }

  &.align-center {
    margin: 0 auto;
  }
`;

export const Counter = styled.div`
  position: absolute;
  bottom: 2.3rem;
  right: 1.5rem;
  color: rgb(
    ${(props) => (props.filled ? props.theme.primary : props.theme.lightText)}
  );

  transition: color 0.5s ease-in-out;
`;

export const Background = styled.div`
  width: 100%;
  min-height: ${(props) => (props.post ? "7rem" : "5rem")};
  padding: 1.5rem 1.5rem ${(props) => (props.paddingBottom ? "3rem" : "0")}
    1.5rem;
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

export const VoteButton = styled.button`
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

export const RemoveModal = styled.div`
  background: rgba(${(props) => props.theme.background}, 0.8);
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const RemoveButton = styled.div`
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  background: transparent;
  cursor: pointer;
  font-size: 1.2rem;
  color: rgb(${(props) => props.theme.text});
  transition: background 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    background: rgba(${(props) => props.theme.text}, 0.2);
    color: rgb(${(props) => props.theme.primary});
  }
`;

export const Message = styled.div`
  font-size: 1.2rem;
  margin-top: 2rem;
`;

export const ButtonContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-around;
  width: 15%;
`;
