import { createAction, handleActions } from 'redux-actions';
import {produce} from 'immer';
import {config} from "../../shared/config";

//actions
const GET_MSG = 'GET_MSG';
const SET_MSG = 'SET_MSG';
const LOADING = 'LOADING';

//actionCreators
const getMsg = createAction(GET_MSG, (msg) => ({ msg }));
const setMsg = createAction(SET_MSG, (msg) => ({ msg }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

// initialState
const initialState = {
    chat_list: [],
    is_loading: false,
  };
  const socket = new WebSocket(config.ws);
  //middleware
  const getChatList = (prevChat)=>{
    return function(dispatch, getState, {history}){
        dispatch(getMsg(prevChat));
    };
  };
const addChatList = (msg)=>{
    return function(dispatch, getState, {history}){
        dispatch(setMsg(msg));

    };
};
  //reducer
export default handleActions({
    [GET_MSG]:(state,action)=>
    produce(state, (draft)=>{
        draft.chat_list = action.payload.msg;
        draft.is_loading = false;
    }),
    [SET_MSG]: (state,action)=>
    produce(state,(draft)=>{
       
        draft.chat_list = [...draft.chat_list, action.payload.msg];
    }),
    [LOADING]:(state,action)=>
    produce(state,(draft)=>{
        draft.is_loading = action.payload.is_loading;
    }),
}, initialState);

const actionCreators = {
    socket,
    loading,
    getChatList,
    addChatList,
};

export {actionCreators};

