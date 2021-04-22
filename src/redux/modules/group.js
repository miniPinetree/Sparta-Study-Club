import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { config } from "../../shared/config";
import { getCookie } from "../../shared/Cookie";
import Swal from "sweetalert2";
import axios from "axios";

const GET_GROUP = "GET_GROUP";
const ADD_GROUP = "ADD_GROUP";
const DELETE_GROUP = "DELETE_GROUP";
const ADD_MEMBER = "ADD_MEMBER";
const LOADING = "LOADING";
const GET_RANK = "GET_RANK";

const getGroup = createAction(GET_GROUP, (group_list) => ({ group_list }));
const addGroup = createAction(ADD_GROUP, (group) => ({ group }));
const deleteGroup = createAction(DELETE_GROUP, (group) => ({ group }));
const addMember = createAction(ADD_MEMBER, (group) => ({ group }));
const loading = createAction(LOADING, (isLoading) => ({ isLoading }));
const getRank = createAction(GET_RANK, (rank) => ({ rank }));

const initialState = {
  group_list: {
    joined: [],
    unjoined: [],
  },
  groupId: null,
  rank: [],
  isLoading: false,
};

const getGroupDB = () => {
  return function (dispatch, { history }) {
    dispatch(loading(true));
    const token = getCookie("sss_token");
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    axios
      .get(`${config.api}/group`)
      .then((res) => {
        switch (res.data.msg) {
          case "success":
            dispatch(getGroup(res.data));
            break;
          case "not_login":
            history.push("/");
            Swal.fire({
              text: "로그인 만료되었습니다.",
              confirmButtonColor: "rgb(118, 118, 118)",
            });
            break;
          default:
            Swal.fire({
              text: "클럽 불러오기에 실패했습니다. ",
              confirmButtonColor: "#E3344E",
            });
            break;
        }
      })
      .catch((err) => console.log(err));
  };
};

const getRankDB = (groupId) => {
  return function (dispatch, { history }) {
    dispatch(loading(true));
    axios
      .get(`${config.api}/group/${groupId}/rank`)
      .then((res) => {
        switch (res.data.msg) {
          case "success":
            dispatch(getRank(res.data.data));
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
              text: "랭킹 불러오기에 실패했습니다. ",
              confirmButtonColor: "#E3344E",
            });
            break;
        }
      })
      .catch((err) => console.log(err));
  };
};

const addGroupDB = (groupName, groupDesc) => {
  return function (dispatch, { history }) {
    let groupInfo = {
      groupName: groupName,
      groupDesc: groupDesc,
    };
    axios
      .post(`${config.api}/group`, groupInfo)
      .then((res) => {
        switch (res.data.msg) {
          case "success":
            dispatch(addGroup(groupInfo));
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
              text: "클럽 생성에 실패했습니다. ",
              confirmButtonColor: "#E3344E",
            });
            break;
        }
      })
      .catch((err) => console.log(err));
  };
};

const deleteGroupDB = (group) => {
  return function (dispatch, { history }) {
    Swal.fire({
      icon: "warning",
      title: "정말 클럽을 삭제하시겠어요?",
      showCancelButton: true,
      confirmButtonColor: "#E2344E",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      cancelButtonColor: "rgb(118, 118, 118)",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${config.api}/group/${group.groupId}`)
          .then((res) => {
            switch (res.data.msg) {
              case "success":
                Swal.fire("삭제 완료!", "클럽이 삭제되었습니다.", "success");
                dispatch(deleteGroup(group));
                window.location.href = '/group';
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
                  text: "클럽 삭제에 실패했습니다. ",
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

const addMemberDB = (group) => {
  return function (dispatch, { history }) {
    axios
      .post(`${config.api}/group/${group.groupId}`)
      .then((res) => {
        switch (res.data.msg) {
          case "success":
            dispatch(addMember(group));
            Swal.fire("가입 완료!");
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
              text: "가입에 실패했습니다. ",
              confirmButtonColor: "#E3344E",
            });
            break;
        }
      })
      .catch((err) => console.log(err));
  };
};

export default handleActions(
  {
    [GET_GROUP]: (state, action) =>
      produce(state, (draft) => {
        draft.group_list = action.payload.group_list;
        draft.isLoading = false;
      }),
    [ADD_GROUP]: (state, action) =>
      produce(state, (draft) => {
        draft.group_list.joined.unshift(action.payload.group);
      }),
    [DELETE_GROUP]: (state, action) =>
      produce(state, (draft) => {
        draft.group_list.joined = draft.group_list.joined.filter(
          (group) => group.groupId !== action.payload.group.groupId
        );
      }),
    [ADD_MEMBER]: (state, action) =>
      produce(state, (draft) => {
        draft.group_list.joined.unshift(action.payload.group);
        draft.group_list.unjoined = draft.group_list.unjoined.filter(
          (group) => group.groupId !== action.payload.group.groupId
        );
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = action.payload.isLoading;
      }),
    [GET_RANK]: (state, action) =>
      produce(state, (draft) => {
        draft.rank = action.payload.rank;
        draft.isLoading = false;
      }),
  },
  initialState
);

const actionCreators = {
  getGroup,
  addGroup,
  deleteGroup,
  addMember,
  getGroupDB,
  addGroupDB,
  deleteGroupDB,
  addMemberDB,
  loading,
  getRankDB,
};

export { actionCreators };
