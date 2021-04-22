import React from "react";
import styled from "styled-components";
import { Grid, Text, UserChat } from "../elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { actionCreators as questActions } from "../redux/modules/quest";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { config } from "../shared/config";
import { actionCreators as chatActions } from "../redux/modules/chat";
import "../scss/class.scss";

const Chat = (props) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const chatOnOff = useSelector ((state)=>state.quest.chat);
  const chat_list = useSelector((state) => state.chat.chat_list);
  const scroll = React.useRef();

  const [message, setMessage] = React.useState([]);

  const submitMessage = (msgContents) => {
    if (!msgContents) {
      Swal.fire({
        text: "내용을 입력해주세요!✏️",
        confirmButtonColor: "#E3344E",
      });
      return;
    } else if (!chatActions.socket.readyState) {
      Swal.fire({
        text: "로딩 중 잠시 후 다시 시도해주세요😥",
        confirmButtonColor: "#E3344E",
      });
    } else {
      chatActions.socket.send(
        JSON.stringify({
          event: "send_msg",
          data: {
            nickname: user.nickname,
            message: msgContents,
          },
        })
      );
    }
  };

  React.useEffect(() => {
    chatActions.socket.onopen = function () {
      console.log("connect socket");
    };
    //서버로부터 수신된 메세지
    chatActions.socket.onmessage = function (message) {
      let { event, data } = JSON.parse(message.data);

      switch (event) {
        case "before_msg":
          console.log(event);
          dispatch(chatActions.getChatList(data));
          break;
        case "callback_msg":
          console.log(event, data);
          dispatch(chatActions.addChatList(data));
          setMessage([]);

          break;
        case "current_visitor":
          console.log("visitor", data);
          break;
      }
    };

    return () => {
      chatActions.socket.close = () => {
        console.log("WebSocket Disconnected", new Date());
      };
    };
  }, []);

  React.useEffect(() => {
    let chat_box = scroll.current
    if(chatOnOff && chat_box.scrollHeight > chat_box.clientHeight){
      chat_box.scrollTop = chat_box.scrollHeight;
    }
  }, [message]);

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
      {chat_list ? (
        <ChatBox ref={scroll}>
          {chat_list.map((obj, index) => (
            <UserChat
              key={obj.nickname + obj.date}
              msg={obj.message}
              nickname={obj.nickname}
              date={obj.date}
            />
          ))}
          <ChatBottomBox>
            <ChatInput
              value={message}
              placeholder="Message.."
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  //submit 후 reload 방지
                  e.preventDefault();
                  submitMessage(e.target.value);
                }
              }}
            />
          </ChatBottomBox>
        </ChatBox>
      ) : null}
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
