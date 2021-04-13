import React from "react";
import styled from 'styled-components';
import { Grid, Text,UserChat } from '../elements';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { actionCreators as questActions } from "../redux/modules/quest";
import { useSelector, useDispatch } from "react-redux";
import '../scss/class.scss';

const Chat = (props) => {
 
  const dispatch = useDispatch();
 return (
   <div className={props.chat?'on_chat':'off_chat'}>
    <ChatTopbox>
      <Grid is_flex padding='10px 15px 0px 15px'>
        <Text size='20px' bold color='#e3344e'>Chat</Text>
        <FontAwesomeIcon icon={faChevronLeft} size='1x' color={'#e3344e'} style={{ cursor: 'pointer' }} onClick={() => {
           dispatch(questActions.onOffChat());
          }}/>
      </Grid>
    </ChatTopbox>
   <ChatBox>
    {/* 더미.... */}
    <UserChat />
    <ChatBottomBox>
      <ChatInput placeholder='Message..'/>
    </ChatBottomBox>
    </ChatBox>
  </div>
)
}

export default Chat;

const ChatBox = styled.div`
 width:260px;
 position: fixed;
 top:50px;
 bottom: 50px;
 left:65px;
 background-color:#f7eaec;
 box-shadow: 1px 0px 7px #ECE7E7;
 overflow-y: scroll;
 box-sizing: border-box;
 
 &::-webkit-scrollbar {
  width:17px;
  height: 100vh;
  background: transparent;
 }
 
 &::-webkit-scrollbar-thumb{
  background-color:#f1a7b2;
  border-radius: 20px;
  height: 50px;
  background-clip: padding-box;
  border: 4px solid transparent;
 }
`

const ChatTopbox = styled.div`
 width:260px;
 height: 50px;
 position: fixed;
 top:0;
 left:65px;
 background-color:#f7eaec;
`


const ChatBottomBox = styled.div`
 width:260px;
 height: 50px;
 background-color: #f7eaec;
 position: fixed;
 bottom: 0;
 left:65px;
 text-align: center;
 box-sizing: border-box;
 padding:5px 0px;
`
const ChatInput = styled.input`
 width:220px;
 height: 20px;
 border-radius: 10px;
 padding:5px 10px;
 outline: none;
 border: 3px solid #e3344e;
 background-color: transparent;

`