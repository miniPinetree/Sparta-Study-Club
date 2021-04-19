import React from "react";
import styled from "styled-components";
import { Grid, Text, UserChat } from "../elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { actionCreators as questActions } from "../redux/modules/quest";
import { useSelector, useDispatch } from "react-redux";
import { config } from "../shared/config";
import "../scss/class.scss";

import { Send } from "@material-ui/icons";
import user from "../redux/modules/user";

// import socketio from "socket.io-client";
// const socket = socketio.connect("ws://3.34.198.18:81/chat");

// const URL = 'wss://javascript.info/article/websocket/chat/ws';
// const URL = "ws://3.34.198.18:8080/";
const Chat = (props) => {
  
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const chatOnOff = useSelector((state) => state.quest.chat);

  const [message, setMessage] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  // const [ws, setWs] = React.useState(new WebSocket(URL));

  const submitMessage = (e) => {
    const message = {
      // user: user.nickname,
      events: e,
      time: new Date().toLocaleTimeString(),
    };
    console.log(e, message);
    // ws.send(JSON.stringify(message));
    setMessages([message, ...messages]);
  };

  React.useEffect(() => {
    if(chatOnOff){
      const socket = new WebSocket('ws://3.34.198.18:8080');
      socket.onopen = function() {
        console.log('Connected');
        socket.send(
          JSON.stringify({
            event: "send_msg",
            data: {
             nickname:'nick',
             message:'msg',
             date: new Date().toISOString(),
            },
          }),
        );
        socket.onmessage = function(data) {
          console.log(data);
          console.log(data.data);
        };
      };
      // socket.on("connect", () => {
      //   // either with send()
      //   socket.send("Hello!");
      
      //   // or with emit() and custom event names
      //   socket.emit("salutations", "Hello!", { "mr": "john" }, Uint8Array.from([1, 2, 3, 4]));
      // });
      
      // // handle the event sent with socket.send()
      // socket.on("message", data => {
      //   console.log(data);
      // });
  
      // ws.onopen = () => {
      //   ws.send("Hello!");
      //   console.log("WebSocket Connected", new Date());
      // };
  
      // //서버에서 수신한 메세지
      // ws.onmessage = (e) => {
      //   const message = JSON.parse(e.data);
      //   setMessages([message, ...messages]);
      // };
  
      // ws.onerror = (error) => {
      //   console.log(`WebSocket error: ${error}`);
      // };
  
      // return () => {
      //   ws.onclose = () => {
      //     console.log("WebSocket Disconnected", new Date());
      //     setWs(new WebSocket(URL));
      //   };
      // };
    }
   
  },[]);
  // }, [ws.onmessage, ws.onopen, ws.onclose, messages]);

  return (
    <ChatAllbox className={props.chat ? "on_chat" : "off_chat"}>
      <ChatTopbox>
        <Grid is_flex padding="10px 15px 0px 15px">
          <Text size="20px" bold color="#e3344e">
            Chat
          </Text>
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="1x"
            color={"#e3344e"}
            style={{ cursor: "pointer" }}
            onClick={() => {
              dispatch(questActions.onOffChat());
            }}
          />
        </Grid>
      </ChatTopbox>
      <ChatBox>
        {messages.reverse().map((message, index) => (
          <UserChat key={index} msg={message} />
        ))}
        <ChatBottomBox>
          <ChatInput
            placeholder="Message.."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submitMessage(message);
                setMessage([]);
              }
            }}
          />
        </ChatBottomBox>
      </ChatBox>
    </ChatAllbox>
  );
};

export default Chat;

const ChatAllbox = styled.div`
  position: relative;
  z-index: 900;
`;

const ChatBox = styled.div`
  width: 260px;
  position: fixed;
  top: 50px;
  bottom: 50px;
  left: 65px;
  background-color: #f7eaec;
  box-shadow: 1px 0px 7px #ece7e7;
  overflow-y: scroll;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 17px;
    height: 100vh;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #f1a7b2;
    border-radius: 20px;
    height: 50px;
    background-clip: padding-box;
    border: 4px solid transparent;
  }
`;

const ChatTopbox = styled.div`
  width: 260px;
  height: 50px;
  position: fixed;
  top: 0;
  left: 65px;
  background-color: #f7eaec;
`;

const ChatBottomBox = styled.div`
  width: 260px;
  height: 50px;
  background-color: #f7eaec;
  position: fixed;
  bottom: 0;
  left: 65px;
  text-align: center;
  box-sizing: border-box;
  padding: 5px 0px;
`;
const ChatInput = styled.input`
  width: 220px;
  height: 20px;
  border-radius: 10px;
  padding: 5px 10px;
  outline: none;
  border: 3px solid #e3344e;
  background-color: transparent;
`;
