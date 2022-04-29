import styled, { css } from 'styled-components';
import GoogleLogo from "./public/google.svg";

const Welcome = styled.h1`
  font-size: 5rem;
  margin-bottom: 2rem;
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

const Root = styled.main`
  width: 50%;
  margin: 30rem auto;
  text-align: center;
`
const ChatRoot = styled.main`
width: 50%;
margin: 2rem auto;
text-align: center;
max-height: 50%;
`

const ChatWindow = styled.div`
  max-height: 80vh;
  min-height: 80vh;
  max-width: 100vw;
  min-width: 100vw;
  max-height: 50vh;
  min-height: 50vh;
  max-width: 25vw;
  min-width: 25vw;
  margin: 2rem auto;
  overflow-y: scroll;
  background-color: white;
  color: black;
  display: flex;
  flex-direction: column;
`

interface ChatBubblePropsT {
  right: boolean;
  color: string;
}

const OtherChat = styled.div<ChatBubblePropsT>`
  position: relative;
  align-self: start;
  max-width: 50%;
  padding: 15px;
  margin: 1em 0 0.5em;
  border: 5px solid;
  border-color: ${props => props.color}};
  color: #333;
  background: #fff;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
`
const UserChat = styled.div`
  position: relative;
  align-self: end;
  max-width: 50%;
  padding: 15px;
  margin: 1em 0 0.5em;
  border: 5px solid #5a8f00;
  color: #333;
  background: #fff;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
`

const ChatInput = styled.input`
  max-width: 25vw;
  min-width: 25vw;
  height: 2rem;
`
interface TimeStampProps {
  left: boolean;
}
const TimeStamp = styled.span<TimeStampProps>`
  align-self: end;
  ${props => props.left && css`align-self: start`};
  font-size: 0.5rem;
`
const Name = styled.span`
  align-self: start;
  font-size: 0.5rem;
  position: relative;
  left: 35px;
  top: 14px;
`
const ChatBubble = styled.img<ChatBubblePropsT>`
  width: 2rem;
  border-radius: 50%;
  position: relative;
  top: 35px;
    z-index: 2;
  ${props => props.right && css`
    left: 90%;
    top: 24px;
  `}

`
export { Welcome, ChatBubble, Name, JoinInput, GoButton, GoogleSignInButton, SignInButton, Button, Root, ChatRoot, ChatWindow, OtherChat, UserChat, ChatInput, TimeStamp } 