import styled, { css } from 'styled-components';
import GoogleLogo from "./public/google.svg";

const Welcome = styled.h1`

`

const JoinInput = styled.input``

const GoButton = styled.button`

`


const BaseButton = styled.button`
`

const Button = styled(BaseButton)`
  padding: 0.5rem 0;
  width: 217px;
  background-size: cover;
`

const SignInButton = styled(Button)`
  height: 40px;
  width: 200px;
  padding-left: calc(20px + 2rem);
  font-size: 14px;
  font-weight: bold;
  text-align: left;
  background-repeat: no-repeat !important;
  background-size: 20px !important;
  background-position: 1rem 50% !important;
`
const GoogleSignInButton = styled(SignInButton)`
  background: white;
  background-image: url(${GoogleLogo});
  border-radius: 5px;
  border: thin solid #888;
  box-shadow: 1px 1px 1px grey;
  background-position-y: calc(50% + 1px) !important;
  :hover { background-color: #4285F4; }
  color: black;
`

export { Welcome, JoinInput, GoButton, GoogleSignInButton, SignInButton, BaseButton } 