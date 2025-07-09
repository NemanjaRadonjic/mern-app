import styled from "styled-components";

export const Container = styled.div`
  width: 100wv;
  background-color: rgb(${(props) => props.theme.primary});
  color: white;
  text-align: center;
  line-height: 1.3rem;
  padding-block: 0.3rem;
  padding-inline: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  box-shadow: 0px 5px 5px rgb(0, 0, 0, 0.1);
  z-index: 50;
  position: sticky;
  top: 0;
`;

export const Icon = styled.i`
  color: inherit;
`;

export const Paragraph = styled.p`
  color: inherit;
`;
