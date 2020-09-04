import styled from "styled-components";
import { primary, backgroundWhite } from "@styles/theme";

export const Container = styled.div`
  margin-top: 1rem;
  margin-left: -1.67rem;
  border-left: 1px solid ${primary};
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  width: 12rem;
`;

export const DropdownConnectorShadow = styled.div`
  filter: drop-shadow(0px -1px 4px rgba(0, 0, 0, 0.2));
`;

export const DropdownConnector = styled.div`
  background: ${backgroundWhite};
  border: 1px solid rgba(0, 0, 0, 0.2);
  height: 10px;
  width: 20px;
  position: absolute;
  margin-top: -12px;
  left: 50%;
  transform: translateX(-50%);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
`;

export const Group = styled.div`
  padding: 1rem 0.5rem;
  width: 100%;
  color: gray;
`;

export const Item = styled.div`
  padding: 1rem;
  width: 100%;
  box-shadow: inset 2px 0 1px ${primary};
  transition: box-shadow 0.2s ease-in-out, color 0.3s ease-in-out;

  &:hover {
    box-shadow: inset 12rem 0 0 ${primary};
    color: ${backgroundWhite};
  }
`;
