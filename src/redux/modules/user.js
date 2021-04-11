import Swal from "sweetalert2";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import axios from "axios";
import { config } from "../../shared/config";

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
  is_login: false,
};

//middleware actions

//회원가입 API
const signupDB = (id, pwd, nick) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "post",
      url: `${config.api}/user`,
      data: {
        email: id,
        password: pwd,
        nickname: nick,
      },
    })
      //다르게 적어보기
      // const data={
      //   email:id,
      //   password:pwd,
      //   nickname:nick,
      // }
      // axios.post(`${config.api}/user`,data)
      .then((res) => {
        console.log(res, res.data);
        if (res.data.msg === "success") {
          Swal.fire({
            text: "가입이 완료되었습니다!",
            confirmButtonColor: "#E3344E",
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/login");
            }
          });
        } else {
          console.log("가입실패");
        }
      })
      .catch((err) => {
        console.log(err, err.toJSON());
      });
  };
};

//로그인 API
const loginDB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "post",
      url: `${config.api}/login`,
      data: {
        email: id,
        password: pwd,
      },
      //서버와 도메인이 달라도 쿠키 전송 허용.
      //서버쪽은 credentials cors 설정 필요
      withCredentials: true,
    })
      .then((res) => {
        console.log(res, res.data);
        if(res.data.msg==="success"){
          setCookie("token", res.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;
        dispatch(
          setUser({
            nickname: res.data.nickname,
            startTime: res.data.startTime,
            setTime: res.data.setTime,
          })
        );
        history.push("/mypage");
        }else{
          Swal.fire({
            text: "아이디 혹은 비밀번호를 확인해주세요.",
            confirmButtonColor: "#E3344E",
          })
        }
        
      })
      .catch((err) => {
        console.log(err, err.toJSON());
      });
  };
};
//로그인 유지
const loginCheckDB = () => {
  return function (dispatch, getState, { history }) {
    // const header = {
    //   headers:{
    //     {"token": getCookie("token")},
    //   }
    // }

    //다른 방식으로 적어보기
    // axios.get(`${config.api}/??`, header)

    //default로 설정한 헤더가 잘 가지는 지 서버에 확인
    axios({
      method: "get",
      url: `${config.api}/??`,
    })
      .then((res) => {
        console.log("logincheck", res);
        if (res.data.msg === "success") {
          dispatch(
            setUser({
              nickname: res.data.nickname,
              startTime: res.data.startTime,
              setTime: res.data.setTime,
            })
          );
          history.push("/mypage");
        } else {
          dispatch(logoutDB());
          history.replace("/");
        }
      })
      .catch((err) => {
        console.log(err, err.toJSON());
      });
  };
};

const logoutDB = () => {
  return function (dispatch, getState, { history }) {
    deleteCookie("token");
    axios.defaults.headers.common["Authorization"] = null;
    delete axios.defaults.headers.common["Authorization"];
    dispatch(logOut());
    history.replace("/");
  };
};

export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),

    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const actionCreators = {
  setUser,
  getUser,
  logOut,
  signupDB,
  loginDB,
  loginCheckDB,
  logoutDB,
};

export { actionCreators };
