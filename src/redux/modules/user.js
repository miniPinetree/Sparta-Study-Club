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
  user:null,
};
//middleware actions
      //다르게 적어보기
      // const data={
      //   email:id,
      //   password:pwd,
      //   nickname:nick,
      // }
      // axios.post(`${config.api}/user`,data)
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
    }).then((res) => {
        if (res.data.msg === "success") {
          Swal.fire({
            text: "가입이 완료되었습니다!",
            confirmButtonColor: "#E3344E",
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/");
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
    })
      .then((res) => {
        if (res.data.msg === "success") {
          const userInfo = {
            nickname: res.data.nickname,
            userTodayId:res.data.userTodayId,
            studySetTime:res.data.studySetTime,
            startTime:res.data.studyTime,
          };
          dispatch(setUser(userInfo));
          setCookie("token", res.data.token, 24 - new Date().getHours());
          setCookie("_study", JSON.stringify(userInfo), 24 - new Date().getHours());
          //토큰을 헤더 기본값으로 설정
          axios.defaults.headers.common[
            "authorization"
          ] = `Bearer ${res.data.token}`; //Bearer
          history.push("/mypage");
        } else {
          Swal.fire({
            text: "아이디 혹은 비밀번호를 확인해주세요.",
            confirmButtonColor: "#E3344E",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
//시간추가 API
//목표시간을 유저 정보에 업데이트
//studySetTime만 보내면 됨. (study Time백엔드에서 자동생성.. => 받아옴)
//userTodayId userinfo 세팅해서 할 일 추가할 때 보내기.
const setTimeDB = (startTime, targetTime)=>{
  return function (dispatch, getState, { history }) {
    const nickname = getState().user.user.nickname;
      axios({
          method:"post",
          url: `${config.api}/quest/time`,
          data:{
              studySetTime:targetTime
          },
      }).then((res)=>{
          if(res.data.msg==="fail"){
              Swal.fire({
                  text: `이미 설정된 시간이 있습니다.`,
                  confirmButtonColor: "#E3344E",
                });
                return;
          }else{
            const userInfo = {
              nickname: nickname,
              userTodayId:res.data.userTodayId,
              startTime:res.data.studyTime,
              studySetTime:targetTime,
            };
            dispatch(setUser(userInfo));
            setCookie("_study", JSON.stringify(userInfo), 24 - new Date().getHours());
                Swal.fire({
                title:`${nickname}님이라면 할 수 있어요`,
                text: `목표를 정해 ${targetTime}시간 내에 완수해봐요 🐱‍🏍
                `,
                confirmButtonColor: "#E3344E",
              });
          }
          }).catch((err) => {
          console.log(err);
        });
  };
};
//로그인 유지, mypage렌더링 과정에서 토큰을 검증하므로
//여기서는 클라이언트에 저장되어 있는 정보로만 1차 확인한다.
const loginCheckDB = () => {
  return function (dispatch, getState, { history }) {
//  const nickname = getState().user.user.nickname;
 const token = getCookie('token');
 const _userInfo = getCookie('_study');
 axios.defaults.headers.common[
  "authorization"
] = `Bearer ${token}`; //Bearer

   if(!token||!_userInfo){
    history.push("/");
   }else{
      const userInfo = JSON.parse(_userInfo);
      dispatch(
        setUser(userInfo)
      );
      history.push("/mypage");
   }
  };
};

const logoutDB = () => {
  return function (dispatch, getState, { history }) {
    deleteCookie("token");
    deleteCookie("_study");
    axios.defaults.headers.common["Authorization"] = null;
    delete axios.defaults.headers.common["Authorization"];
    dispatch(logOut());
    history.replace('/');
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
