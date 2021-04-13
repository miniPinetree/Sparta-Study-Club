import Swal from "sweetalert2";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import { createAction, handleActions } from "redux-actions";
import { config } from "../../shared/config";
import { produce } from "immer";
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
  //더미 ! 서버와 연결할 때는 null로 바꾸세요.
  user: {
    nickname: "영은짱짱맨",
    startTime: 1618304299107,
    setTime: 1,
  },
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
      url: `${config.api}/user/auth`,
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
        if (res.data.msg === "success") {
          const userInfo = {
            nickname: res.data.nickname,
            startTime: res.data.startTime,
            setTime: res.data.setTime,
          };
          dispatch(setUser(userInfo));
          setCookie("token", res.data.token);
          //토큰을 헤더 기본값으로 설정
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.token}`;
          setCookie("info", userInfo, 24 - new Date().getHours());
          history.push("/mypage");
        } else {
          Swal.fire({
            text: "아이디 혹은 비밀번호를 확인해주세요.",
            confirmButtonColor: "#E3344E",
          });
        }
      })
      .catch((err) => {
        console.log(err, err.toJSON());
      });
  };
};
//시간추가 API
//목표시간을 유저 정보에 업데이트
const setTimeDB = (startTime, targetTime)=>{
  return function (dispatch, getState, { history }) {
    const nickname = getState().user.user.nickname;
    const userInfo = {
      nickname: nickname,
      startTime: startTime,
      setTime: targetTime,
    };
    console.log(nickname,userInfo);
    setCookie("info", userInfo, 24 - new Date().getHours());

      // axios({
      //     method:"post",
      //     url: `${config.api}/time`,
      //     data:{
      //         studyTime:startTime,
      //         studySetTime:targetTime
      //     },
      // }).then((res)=>{
      //     console.log(res.data);
      //     if(res.data.msg==="fail"){
      //         Swal.fire({
      //             text: `저장에 실패했습니다.`,
      //             confirmButtonColor: "#E3344E",
      //           });
      //           return;
      //     }else{
      //       const nickname = getState().user.user.nickname;
      //       const userInfo = {
      //         nickname: nickname,
      //         startTime: startTime,
      //         setTime: targetTime,
      //       };
      //         dispatch(setUser(userInfo)).then((res)=>{
      //           setCookie("info", userInfo, 24 - new Date().getHours());
      //           Swal.fire({
      //           title:`${nickname}님이라면 할 수 있어요`,
      //           text: `목표를 정해 ${targetTime}시간 내에 완수해봐요 🐱‍🏍
      //           `,
      //           confirmButtonColor: "#E3344E",
      //         });
      //     })
      //     }}).catch((err) => {
      //     console.log(err, err.toJSON());
      //   });
  };
};

//로그인 유지, mypage렌더링 과정에서 토큰을 검증하므로
//여기서는 클라이언트에 저장되어 있는 정보로만 1차 확인한다.
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
    const info = getCookie("info");
   if(!info){
    dispatch(logoutDB());
    history.replace("/");
   }else{
    dispatch(
      setUser({
        nickname: info.nickname,
        startTime: info.startTime,
        setTime: info.setTime,
      })
    );
    history.push("/mypage");
   }
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
      }),

    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = null;
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
  setTimeDB
};

export { actionCreators };
