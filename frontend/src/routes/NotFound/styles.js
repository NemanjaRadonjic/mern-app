import styled from "styled-components";

import { textGray } from "../../styles/theme";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const Image = styled.div`
  font-size: 2.5rem;
  margin: 6rem 0 3rem 0;
  color: ${textGray};
`;

export const Message = styled.div`
  font-size: 1.5rem;
  color: ${textGray};
`;
