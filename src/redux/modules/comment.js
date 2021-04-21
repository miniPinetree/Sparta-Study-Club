import { createAction, handleActions } from "redux-actions";
import { getCookie } from "../../shared/Cookie";
import { produce } from "immer";
import { config } from "../../shared/config";
import Swal from "sweetalert2";
import axios from "axios";

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";
const UPDATE_COMMENT = "UPDATE_COMMENT";

const setCmt = createAction(SET_COMMENT, (cmt_list) => ({ cmt_list }));
const addCmt = createAction(ADD_COMMENT, (cmt) => ({ cmt }));
const deleteCmt = createAction(DELETE_COMMENT, (cmtId) => ({ cmtId }));
const updateCmt = createAction(UPDATE_COMMENT, (cmt) => ({ cmt }));

const initialState = {
  cmt_list: [
    {
      cmtId: 1,
      nickname: "고미짱",
      cmtContents: "오늘도 밤을 샜어요 하하하하",
      createdDt:"21-04-20",
    },
    {
        cmtId: 2,
        nickname: "해시브라운",
        cmtContents: "해시문제 너무 싫어요..",
        createdDt:"21-04-20",
      },
      {
        cmtId: 3,
        nickname: "알고왕",
        cmtContents: "🔥🔥 알고리즘 이글이글",
        createdDt:"21-04-20",
      },
      {
        cmtId: 4,
        nickname: "삐약이",
        cmtContents: "오늘 가입했어요 잘 부탁드려욧!",
        createdDt:"21-04-20",
      },
      {
        cmtId: 5,
        nickname: "푸들도리",
        cmtContents: "저 오늘 백준 골드 티어 됐어요 🤩 축하해주세요",
        createdDt: "21-04-20",
      },
  ]

};

const setCmtDB = (groupId) => {
  return function (dispatch, getState, { history }) {
    const token = getCookie("token");
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`; //Bearer

    axios({
      method: "get",
      url: `${config.api}/group/${groupId}/comment`,
    })
      .then((res) => {
        dispatch(setCmt(res.data.data));
      })
      .catch((err) => console.log(err));
  };
};

const addCmtDB = (groupId, cmtContents) => {
  return function (dispatch, getState, { history }) {
    if (!cmtContents) {
      Swal.fire({
        text: "내용을 입력해주세요!✏️",
        confirmButtonColor: "#E3344E",
      });
      return;
    }
    axios({
      method: "post",
      url: `${config.api}/comment/${groupId}`,
      data: {
        cmtContents: cmtContents,
      },
    })
      .then((res) => {
        if (res.data.msg === "fail") {
          Swal.fire({
            text: "댓글 작성에 실패했습니다. ",
            confirmButtonColor: "#E3344E",
          });
        } else {
          let data = res.data.data;
          console.log(data, data[0].nickname);
          let cmt = {
            cmtId: data[0].cmtId,
            nickname: data[0].nickname,
            cmtContents: data[0].cmtContents,
            createdDt: data[0].createdDt,
          };
          dispatch(addCmt(cmt));
        }
      })
      .catch((err) => console.log(err));
  };
};

const deleteCmtDB = (cmtId) => {
  return function (dispatch, getState, { history }) {
    Swal.fire({
      icon: "warning",
      title: "정말 댓글을 삭제하시겠어요?",
      showCancelButton: true,
      confirmButtonColor: "rgb(118, 118, 118)",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      cancelButtonColor: "#E2344E",
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          method: "DELETE",
          url: `${config.api}/comment/${cmtId}`,
        })
          .then((res) => {
            if (res.data.msg === "fail") {
              Swal.fire({
                text: "잠시 후 다시 시도해주세요.",
                confirmButtonColor: "rgb(118, 118, 118)",
              });
            } else {
              dispatch(deleteCmt(cmtId));
              Swal.fire("삭제 완료!", "댓글이 삭제되었습니다.", "success");
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };
};

const updateCmtDB = (cmt) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "PUT",
      url: `${config.api}/comment/:${cmt.cmtId}`,
    })
      .then((res) => {
        if (res.data.msg === "fail") {
          Swal.fire({
            text: "잠시 후 다시 시도해주세요.",
            confirmButtonColor: "rgb(118, 118, 118)",
          });
        } else {
          dispatch(updateCmt(cmt));
          Swal.fire("수정 완료!", "success");
        }
      })
      .catch((err) => console.log(err));
  };
};

export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.cmt_list = action.payload.cmt_list;
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.cmt_list.unshift(action.payload.cmt);
      }),
    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.cmt_list = draft.cmt_list.filter((c) => {
          return c.cmtId !== action.payload.cmtId;
        });
      }),
    [UPDATE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.cmt_list.findIndex(
          (cmt) => cmt.cmtId === action.payload.cmt.cmtId
        );
        draft.cmt_list[idx] = action.payload.cmt;
      }),
  },
  initialState
);

const actionCreators = {
  setCmt,
  addCmt,
  deleteCmt,
  updateCmt,
  setCmtDB,
  addCmtDB,
  deleteCmtDB,
  updateCmtDB,
};

export { actionCreators };
