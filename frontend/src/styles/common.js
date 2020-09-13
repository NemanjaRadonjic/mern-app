import styled, { keyframes } from "styled-components";

export const FormContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

export const Header = styled.div`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 3rem;
  color: rgb(${(props) => props.theme.primary}); ;
`;

export const Input = styled.input`
  width: 60%;
  margin: 0.5rem auto;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-bottom: 2px solid rgb(${(props) => props.theme.primary});
  background-color: transparent;
  box-shadow: inset 0 0px 0px rgb(0, 0, 0, 0.2);
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: inset 0 3px 10px rgb(0, 0, 0, 0.1);
  }

  &:focus {
    box-shadow: inset 0 3px 10px rgb(0, 0, 0, 0.1);
  }
`;

export const Error = styled.div`
  width: 60%;
  height: 1.5rem;
  margin: 0 auto 0.5rem auto;
  color: red;
  text-align: center;
`;

export const Message = styled.div`
  cursor: pointer;
  margin: 3rem auto 1rem auto;
  text-decoration: underline;
  &:hover {
    color: rgb(${(props) => props.theme.primary});
  }
`;

export const NoContentMessage = styled.div`
  margin-top: 5rem;
  color: gray;
  font-size: 1.2rem;
  text-align: center;
`;

export const Button = styled.button`
  width: 8rem;
  font-size: 1rem;
  background: transparent;
  display: block;
  padding: 0.5rem 1rem;
  border: 1px solid rgb(${(props) => props.theme.primary});
  box-shadow: inset 0 0 0 rgb(${(props) => props.theme.primary});
  cursor: pointer;

  transition: box-shadow 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    color: white;
    box-shadow: inset 0 -3rem 0 rgb(${(props) => props.theme.primary});
  }

  &.align-center {
    margin: 0 auto;
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
  width: 5rem;
  height: 5rem;
  margin: 60px auto;
  font-size: 10px;
  position: relative;
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
    width: 10rem;
    height: 10rem;
    box-shadow: inset 10px 10px 1px 10px rgba(0, 0, 0, 1);
  }
`;
