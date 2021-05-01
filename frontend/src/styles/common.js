import styled, { keyframes } from "styled-components";

export const FormContainer = styled.div`
  height: ${(props) => (props.smaller ? "50vh" : "100vh")};
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;

  @media (max-width: 600px) {
    height: ${(props) => (props.smaller ? "45vh" : "calc(100vh - 11rem)")};
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 70%;
  @media (max-height: 900px) {
  }
`;

export const Header = styled.div`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 3rem;
  color: rgb(${(props) => props.theme.primary});

  @media (max-height: 900px) {
    margin-bottom: 1rem;
  }
`;

export const Input = styled.input`
  width: 60%;
  margin: 0.5rem auto;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-bottom: 2px solid
    rgb(${(props) => (props.error ? props.theme.error : props.theme.primary)});
  background-color: transparent;
  box-shadow: inset 0 0px 0px rgb(0, 0, 0, 0.2);
  transition: box-shadow 0.2s ease-in-out, border 0.2s ease-in-out;

  &:hover {
    box-shadow: inset 0 3px 10px rgb(0, 0, 0, 0.1);
  }

  &:focus {
    box-shadow: inset 0 3px 10px rgb(0, 0, 0, 0.1);
  }

  @media (max-height: 900px) {
    margin: 0 auto;
  }
`;

export const Error = styled.div`
  width: 100%;
  height: 1.5rem;
  margin: 0 auto 0.5rem auto;
  color: rgb(${(props) => props.theme.error});
  text-align: center;
`;

export const Message = styled.div`
  cursor: pointer;
  margin: 3rem auto 1rem auto;
  text-align: center;
  text-decoration: underline;
  &:hover {
    color: rgb(${(props) => props.theme.primary});
  }

  @media (max-height: 900px) {
    margin: 1rem auto;
  }
`;

export const NoContentMessage = styled.div`
  margin-top: 5rem;
  color: gray;
  font-size: 1.2rem;
  text-align: center;
`;

export const Button = styled.button`
  margin: 1rem auto;
  width: 9.5rem;
  font-size: 1rem;
  background: transparent;
  display: block;
  padding: 0 1rem;
  color: rgb(${(props) => props.theme.text});
  border: none;
  border: 1px solid
    ${(props) =>
      props.disabled
        ? `rgba(${props.theme.primary}, 0.5)`
        : `rgb(${props.theme.primary})`};
  box-shadow: inset 0 2rem 2rem
    ${(props) =>
      props.disabled
        ? `rgba(${props.theme.primary}, 0.5)`
        : `rgb(${props.theme.primary})`};
  cursor: pointer;

  transition: box-shadow 0.3s ease-in-out, border 0.5s ease-in-out;

  &:hover {
    box-shadow: inset 0 -2rem 10rem ${(props) => (props.disabled ? `rgba(${props.theme.primary}, 0.7)` : `rgb(${props.theme.primary})`)};
  }
  &.force-center {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const loaderAnimation = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;
export const Loader = styled.div`
  border-radius: 50%;
  width: ${(props) => (props.mini ? "1rem" : "5rem")};
  height: ${(props) => (props.mini ? "1rem" : "5rem")};
  margin: 60px auto;
  font-size: ${(props) => (props.mini ? "4px" : "10px")};
  position: ${(props) => (props.mini ? "absolute" : "relative")};
  top: ${(props) => (props.mini ? "-3.1rem" : "-2.1rem")};
  right: 0.8rem;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(255, 255, 255, 0.2);
  border-right: 1.1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
  border-left: 1.1em solid rgb(${(props) => props.theme.primary});
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: ${loaderAnimation} 1s infinite linear;
  animation: ${loaderAnimation} 1s infinite linear;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

  &:after {
    border-radius: 50%;
    width: ${(props) => (props.mini ? "2rem" : "10rem")};
    height: ${(props) => (props.mini ? "2rem" : "10rem")};
    box-shadow: inset 10px 10px 1px 10px rgba(0, 0, 0, 1);
  }
`;
