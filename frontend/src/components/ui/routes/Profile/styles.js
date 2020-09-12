import styled from "styled-components";

export const NavContainer = styled.div`
  width: 100%;
  height: 15rem;
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  border-bottom: 0px solid rgb(${(props) => props.theme.primary});
`;

export const ContentContainer = styled.div``;

export const AvatarContainer = styled.img`
  border: 5px solid rgb(${(props) => props.theme.background});
  height: 7rem;
  width: 7rem;
  border-radius: 50%;
  position: absolute;
  bottom: -5%;
  left: 50%;
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
