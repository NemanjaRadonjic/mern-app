import styled from "styled-components";

export const NavContainer = styled.div`
  width: 100%;
  height: 15rem;
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;

export const NavContainerPreview = styled.canvas`
  width: 100%;
  height: 15rem;
  position: relative;
  margin-bottom: -9px;
`;

export const ContentContainer = styled.div``;

export const AvatarContainer = styled.img`
  border: 5px solid rgb(${(props) => props.theme.background});
  height: 7rem;
  width: 7rem;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  bottom: 75%;
  transform: translateX(-50%);
  transition: border 0.4s ease-in-out;
`;

export const AvatarPreview = styled.canvas`
  border: 5px solid rgb(${(props) => props.theme.background});
  height: 7rem;
  width: 7rem;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  bottom: 75%;
  transform: translateX(-50%);
  transition: border 0.4s ease-in-out;
`;

export const Username = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 20%;
  font-weight: bold;
`;

export const NavbarContainer = styled.div`
  width: 100%;
  height: 2.7rem;
  display: flex;
  position: relative;
  justify-content: space-between;
  border-bottom: 1px solid rgb(${(props) => props.theme.primary});
`;

export const NavbarItem = styled.div`
  height: 2.7rem;
  width: 21%;
  box-shadow: inset 0 -2px 1px rgb(${(props) => props.theme.primary});
  transition: box-shadow 0.2s ease-in-out, color 0.3s ease-in-out;

  &:hover {
    box-shadow: inset 0 -5.4rem 0 rgb(${(props) => props.theme.primary});
    color: rgb(${(props) => props.theme.background});
  }
`;

export const PermissionDenied = styled.div`
  text-align: center;
  margin-top: 5rem;
  font-size: 1.3rem;
  color: rgb(${(props) => props.theme.primary});
`;

export const Header = styled.div`
  font-size: 2rem;
  color: inherit;
`;

export const Message = styled.div`
  color: inherit;
`;
