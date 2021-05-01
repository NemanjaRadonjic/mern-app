import styled from "styled-components";

export const Container = styled.div`
  margin-top: -0.5rem;
  margin-left: -1.1rem;
  border-left: 1px solid rgb(${(props) => props.theme.primary});
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  width: 12rem;

  @media (max-width: 1000px) {
    position: absolute;
    right: 0.9rem;
    top: 6rem;
  }

  @media (max-width: 600px) {
    top: -28.5rem;
    right: 50%;
    transform: translateX(22%);
  }
`;

export const DropdownConnectorShadow = styled.div`
  filter: drop-shadow(
    0px -1px 0px rgba(${(props) => props.theme.primary}, 0.5)
  );

  @media (max-width: 600px) {
    filter: drop-shadow(
      0px 1px 0px rgba(${(props) => props.theme.primary}, 0.5)
    );
  }
`;

export const DropdownConnector = styled.div`
  background: rgb(${(props) => props.theme.background});
  height: 10px;
  width: 20px;
  position: absolute;
  margin-top: -10px;
  left: 50%;
  transform: translateX(-50%);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);

  @media (max-width: 600px) {
    top: 29.6rem;
    clip-path: polygon(50% 100%, 0% 0%, 100% 0);
  }
`;

export const Group = styled.div`
  background: rgb(${(props) => props.theme.background});
  padding: 1rem 0.5rem;
  width: calc(100% - 1rem);
  color: gray;
`;

export const Item = styled.div`
  background: rgb(${(props) => props.theme.background});
  height: 2.7rem;
  box-shadow: inset 2px 0 1px rgb(${(props) => props.theme.primary});
  transition: box-shadow 0.2s ease-in-out, color 0.3s ease-in-out;

  &:hover {
    box-shadow: inset 12rem 0 0 rgb(${(props) => props.theme.primary});
    color: rgb(${(props) => props.theme.background});
  }
`;
