import { createAction, handleActions } from "redux-actions";
import { getCookie } from "../../shared/Cookie";
import { produce } from "immer";
import { config } from "../../shared/config";
import Swal from "sweetalert2";
import axios from "axios";

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

const setCmt = createAction(SET_COMMENT, (cmt_list) => ({ cmt_list }));
const addCmt = createAction(ADD_COMMENT, (cmt) => ({ cmt }));
const deleteCmt = createAction(DELETE_COMMENT, (cmtId) => ({ cmtId }));

const initialState = {
  cmt_list: [],
};

const setCmtDB = (groupId) => {
  return function (dispatch, { history }) {
    const token = getCookie("sss_token");
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    axios
      .get(`${config.api}/group/${groupId}/comment`)
      .then((res) => {
        switch (res.data.msg) {
          case "success":
            dispatch(setCmt(res.data.data));
            break;
          case "not_login":
            Swal.fire({
              text: "로그인 만료되었습니다.",
              confirmButtonColor: "rgb(118, 118, 118)",
            });
            history.push("/");
            break;
          default:
            Swal.fire({
              text: "댓글 불러오기에 실패했습니다. ",
              confirmButtonColor: "#E3344E",
            });
            break;
        }
      })
      .catch((err) => console.log(err));
  };
};

const addCmtDB = (groupId, cmtContents) => {
  return function (dispatch, { history }) {
    if (!cmtContents) {
      Swal.fire({
        text: "내용을 입력해주세요!✏️",
        confirmButtonColor: "#E3344E",
      });
      return;
    }
    const data = { cmtContents: cmtContents };
    axios
      .post(`${config.api}/comment/${groupId}`, data)
      .then((res) => {
        switch (res.data.msg) {
          case "success":
            let _cmt = res.data.data[0];
            let cmt = {
              cmtId: _cmt.cmtId,
              nickname: _cmt.nickname,
              cmtContents: _cmt.cmtContents,
              createdDt: _cmt.createdDt,
            };
            dispatch(addCmt(cmt));
            break;
          case "not_login":
            Swal.fire({
              text: "로그인 만료되었습니다.",
              confirmButtonColor: "rgb(118, 118, 118)",
            });
            history.push("/");
            break;
          default:
            Swal.fire({
              text: "댓글 작성에 실패했습니다. ",
              confirmButtonColor: "#E3344E",
            });
            break;
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
        axios
          .delete(`${config.api}/comment/${cmtId}`)
          .then((res) => {
            switch (res.data.msg) {
              case "success":
                dispatch(deleteCmt(cmtId));
                Swal.fire("삭제 완료!", "댓글이 삭제되었습니다.", "success");
                break;
              case "not_login":
                Swal.fire({
                  text: "로그인 만료되었습니다.",
                  confirmButtonColor: "rgb(118, 118, 118)",
                });
                history.push("/");
                break;
              default:
                Swal.fire({
                  text: "댓글 삭제에 실패했습니다. ",
                  confirmButtonColor: "#E3344E",
                });
                break;
            }
          })
          .catch((err) => console.log(err));
      }
    });
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
  },
  initialState
);

const actionCreators = {
  setCmt,
  addCmt,
  deleteCmt,
  setCmtDB,
  addCmtDB,
  deleteCmtDB,
};

export { actionCreators };
