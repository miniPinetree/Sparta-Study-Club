
import axios from "axios";
import {config} from "./config";
import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";

const socket = new WebSocket({config.ws});


const openSocket = ()=>{
    socket.onopen = function () {
        console.log("소켓 연결 성공");
      };
}