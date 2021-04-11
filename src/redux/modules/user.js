import Swal from "sweetalert2";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import axios from "axios";

//action type
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

//action creator
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));

const initialState = {
  user: null,
  token: null,
  is_login:false,
};

//middleware actions

//회원가입 API
const signupDB = (id,pwd,nick)=>{
  return function (dispatch, getState, {history}){
    axios({
      method:"post",
      url:"/user",
      data:{
        email:id,
        password:pwd,
        nickname:nick,
      },
    }).then((res)=>{
      console.log(res, res.data);
      if(res.data.msg==="success"){
        Swal.fire({
          text: "가입이 완료되었습니다!",
          confirmButtonColor: "#E3344E",
        }).then((result)=>{
          if(result.isConfirmed){
            history.push("/login");
          }
        })
      }else{
        console.log("가입실패");
      }
    }).catch((err) => {
      console.log(err);
    });
  }
};

//로그인 API
const loginDB=(id,pwd)=>{
  return function (dispatch, getState, {history}){
    axios({
      method:"post",
      url:"/login",
      data:{
        email:id,
        password:pwd,
      },
    }).then((res)=>{
      console.log(res, res.data);
      
      history.push('/mypage')
    }).catch((err) => {
      console.log(err);
    });
  }
};

export default handleActions({
  [SET_USER]: (state, action) =>
    produce(state, (draft) => {
      setCookie("token", "success");
      draft.user = action.payload.user;
      draft.is_login = true;
    }),

    [LOG_OUT]: (state,action)=>
    produce(state,(draft)=>{
        deleteCookie("token");
        draft.user=null;
        draft.is_login=false;
    }),
    [GET_USER]:(state,action)=>
    produce(state,(draft)=>{
        
    }),
  
},
initialState
);

const actionCreators ={
    setUser,
    getUser,
    logOut,
    signupDB,
    loginDB,
};

export {actionCreators};