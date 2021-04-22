import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { config } from "../../shared/config";
import moment from "moment";
import Swal from "sweetalert2";

//actions
const SET_QUEST = "SET_QUEST";
const ADD_QUEST = "ADD_QUEST";
const DELETE_QUEST = "DELETE_QUEST";
const UPDATE_QUEST = "UPDATE_QUEST";
const SET_MONTH_QUEST = "SET_MONTH_QUEST";
const LOADING = "LOADING";
const CHATTING = "CHATTING";
const SET_CALENDAR = "SET_CALENDAR";

//action creators
const setQuest = createAction(SET_QUEST, (dayQuest) => ({ dayQuest }));
const addQuest = createAction(ADD_QUEST, (quest, questRate, monthQuest) => ({
  quest,
  questRate,
  monthQuest,
}));
const deleteQuest = createAction(
  DELETE_QUEST,
  (questId, questRate, monthQuest) => ({ questId, questRate, monthQuest })
);
const updateQuest = createAction(
  UPDATE_QUEST,
  (questId, questYn, questRate, monthQuest) => ({
    questId,
    questYn,
    questRate,
    monthQuest,
  })
);
const setMonthQuest = createAction(SET_MONTH_QUEST, (monthQuest) => ({
  monthQuest,
}));
const loading = createAction(LOADING, (isLoading) => ({ isLoading }));
const setChatting = createAction(CHATTING, (on_off) => ({ on_off }));
const setCalendar = createAction(SET_CALENDAR, (month) => ({ month }));

const initialState = {
  dayQuest: [],
  monthQuest: [],
  isLoading: false,
  chat: false,
  calendar: null,
};

//채팅방 on/off 여부
const onOffChat = () => {
  return function (dispacth, getState, { history }) {
    let _chat = getState().quest.chat;
    _chat = _chat ? false : true;
    dispacth(setChatting(_chat));
  };
};
//캘린더 data 불러오기
const getMonthQuestDB = (date = null, move = null) => {
  return function (dispatch, getState, { history }) {
    if (!date) {
      return;
    }
    let year = date.substring(0, 4);
    let month;
    if (date.length === 5) {
      month = date.substring(date.length - 1, date.length);
    } else {
      month = date.substring(date.length - 2, date.length);
    }
    dispatch(loading(true));
    axios({
      method: "get",
      url: `${config.api}/quest/calendar?year=${year}&month=${month}`,
    })
      .then((res) => {
        if (res.data.msg === "success") {
          const _data = res.data.data;
          const _day = _data.map((d) => d.day);
          const day = _day.filter((d, idx) => {
            return _day.indexOf(d) === idx;
          });
          const _monthQuest = [];
          day.forEach((d) => {
            let keyDay = { day: d };
            _monthQuest.push(keyDay);
          });
          _monthQuest.forEach((d, idx) => {
            const findData = _data.find((_d) => _d.day === d.day);
            const basicSetting = {
              studyTime: findData.studyTimeStamp,
              studySetTime: findData.studySetTime,
              questRate: findData.questRate,
              quest: [],
            };
            _monthQuest[idx] = { ..._monthQuest[idx], ...basicSetting };
            _data.forEach((_d) => {
              //일자별 퀘스트 분류
              if (d.day === _d.day) {
                let _quest = {
                  questId: _d.questId,
                  questContents: _d.questContents,
                  questYn: _d.questYn === 0 ? false : true,
                };
                _monthQuest[idx].quest.push(_quest);
              }
            });
          });
          dispatch(setMonthQuest(_monthQuest));
          let today = moment().format("YYYY/MM/DD");
          let _dayQuest = _monthQuest.find((m) => m.day === today);
          //당일에 이미 추가해둔 퀘스트가 존재하는 경우
          if (_dayQuest) {
            dispatch(setQuest(_dayQuest.quest));
          }
          let thisMonth;
          let moveMonth;
          let moveYear;
          // 월 이동 이벤트
          if (move === "add") {
            //연,월을 비교하여 캘린더 정보 세팅
            moveYear = Number(year) - Number(moment().format("YYYY"));
            moveMonth = Number(month) - Number(moment().format("M"));
            if (moveYear === 0) {
              if (moment().format("M") === month) {
                dispatch(setCalendar(moment()));
                return false;
              }
              thisMonth = moment().add(moveMonth, "month");
              dispatch(setCalendar(thisMonth));
            } else {
              //다음 년도들..
              thisMonth = moment()
                .add(moveYear, "year")
                .add(moveMonth, "month");
              dispatch(setCalendar(thisMonth));
              return false;
            }
          } else if (move === "subtract") {
            moveYear = Number(moment().format("YYYY")) - Number(year);
            moveMonth = Number(moment().format("M")) - Number(month);
            if (moveYear === 0) {
              if (moment().format("M") === month) {
                dispatch(setCalendar(moment()));
                return false;
              }
              thisMonth = moment().subtract(moveMonth, "month");
              dispatch(setCalendar(thisMonth));
            } else {
              //이전 년도들..
              thisMonth = moment()
                .subtract(moveYear, "year")
                .subtract(moveMonth, "month");
              dispatch(setCalendar(thisMonth));
            }
           //월 이동 이벤트가 발생하지 않은 초기 상태
          } else {
            dispatch(setCalendar(moment()));
          }
        }
      })
      .catch((err) => console.log(err));
  };
};
const addQuestDB = (questContents = null) => {
  return function (dispacth, getState, { history }) {
    const userTodayId = getState().user.user.userTodayId;
    if (!questContents) {
      Swal.fire({
        text: "내용을 입력해주세요!✏️",
        confirmButtonColor: "#E3344E",
      });
      return false;
    }
    const data = {
      questContents: questContents,
      userTodayId: userTodayId,
    }
    axios.post(`${config.api}/quest`,data)
  .then((res) => {
        if (res.data.msg === "success") {
          let _quest = {
            questId: res.data.questId,
            questContents: res.data.questContents,
            questYn: false,
          };
          const _monthQuest = getState().quest.monthQuest;
          const user = getState().user.user;
          const today = moment().format("YYYY/MM/DD");
          const todayMonthQuest = _monthQuest.find((m) => m.day === today);
          console.log(_monthQuest, todayMonthQuest);
          //monthQuest에 오늘 날짜가 없다면 새로 추가
          if (!todayMonthQuest) {
            let monthQuest = {
              day: today,
              questRate: 0,
              studyTime: user.startTime,
              studySetTime: user.studySetTime,
              quest: [],
            };
            monthQuest.quest.push(_quest);
            dispacth(addQuest(_quest, res.data.questRate, monthQuest));
            return false;
          }
          let copyQuest = todayMonthQuest.quest.filter(() => true);
          copyQuest = [...copyQuest, _quest];
          let _todayMonthQuest = Object.assign({}, todayMonthQuest);
          _todayMonthQuest.quest = copyQuest;
          dispacth(addQuest(_quest, res.data.questRate, _todayMonthQuest));
        } else {
          Swal.fire({
            text: "퀘스트 등록에 실패했습니다. ",
            confirmButtonColor: "#E3344E",
          });
        }
      })
      .catch((err) => console.log(err));
  };
};
const deleteQuestDB = (questId = null) => {
  return function (dispacth, getState, { history }) {
    const userTodayId = getState().user.user.userTodayId;
    if (!questId || !userTodayId) {
      console.log("questId 혹은 userTodayId가 없습니다.");
      return false;
    }
    axios
    ({
      method: "delete",
      url: `${config.api}/quest`,

      data: {
        userTodayId: userTodayId,
        questId: questId,
      },
    })
      .then((res) => {
        if (res.data.msg === "success") {
          const _monthQuest = getState().quest.monthQuest;
          const today = moment().format("YYYY/MM/DD");
          const todayMonthQuest = _monthQuest.find((m) => m.day === today);
          let copyQuest = todayMonthQuest.quest.filter(() => true);

          let idx = copyQuest.findIndex((q) => q.questId === questId);
          copyQuest.splice(idx, 1);
          let _todayMonthQuest = Object.assign({}, todayMonthQuest);
          _todayMonthQuest.quest = copyQuest;

          dispacth(deleteQuest(questId, res.data.questRate, _todayMonthQuest));
        } else {
          Swal.fire({
            text: "퀘스트 삭제를 실패했습니다. ",
            confirmButtonColor: "#E3344E",
          });
        }
      })
      .catch((err) => console.log(err));
  };
};
//userTodayId body에 같이 실어서 보내기 추가만.
const updateQuestDB = (questId = null) => {
  return function (dispacth, getState, { history }) {
    const userTodayId = getState().user.user.userTodayId;

    if (!questId || !userTodayId) {
      console.log("questId 혹은 userTodayId가 없습니다.");
      return false;
    }
    const quest = getState().quest.dayQuest.find((q) => q.questId === questId);
    let questYn = quest.questYn ? false : true;
    axios({
      method: "patch",
      url: `${config.api}/quest`,
      data: {
        userTodayId: userTodayId,
        questId: questId,
        questYn: questYn,
      },
    }).then((res) => {
      if (res.data.msg === "success") {
        const _monthQuest = getState().quest.monthQuest;
        const today = moment().format("YYYY/MM/DD");
        const todayMonthQuest = _monthQuest.find((m) => m.day === today);
        let copyQeust = todayMonthQuest.quest.filter(() => true);

        let idx = copyQeust.findIndex((q) => q.questId === questId);
        copyQeust[idx] = { ...copyQeust[idx], questYn: questYn };

        let _todayMonthQuest = Object.assign({}, todayMonthQuest);
        _todayMonthQuest.quest = copyQeust;
        dispacth(
          updateQuest(questId, questYn, res.data.questRate, _todayMonthQuest)
        );
      } else {
        Swal.fire({
          text: "퀘스트 업데이트에 실패했습니다. ",
          confirmButtonColor: "#E3344E",
        });
      }
    });
  };
};

export default handleActions(
  {
    [SET_QUEST]: (state, action) =>
      produce(state, (draft) => {
        draft.dayQuest = action.payload.dayQuest;
      }),
    [ADD_QUEST]: (state, action) =>
      produce(state, (draft) => {
        draft.dayQuest.unshift(action.payload.quest);
        let today = moment().format("YYYY/MM/DD");
        let idx = draft.monthQuest.findIndex((m) => m.day === today);
        if (idx !== -1) {
          draft.monthQuest[idx].questRate = action.payload.questRate;
        }

        let _idx = draft.monthQuest.findIndex(
          (m) => m.day === action.payload.monthQuest.day
        );

        if (_idx === -1) {
          draft.monthQuest = [action.payload.monthQuest, ...draft.monthQuest];
        } else {
          draft.monthQuest[_idx] = action.payload.monthQuest;
          draft.monthQuest[_idx].questRate = action.payload.questRate;
        }
      }),
    [DELETE_QUEST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.dayQuest.findIndex(
          (q) => q.questId === action.payload.questId
        );
        draft.dayQuest.splice(idx, 1);
        let today = moment().format("YYYY/MM/DD");
        let _idx = draft.monthQuest.findIndex((m) => m.day === today);
        if (_idx !== -1) {
          draft.monthQuest[_idx] = action.payload.monthQuest;
          draft.monthQuest[_idx].questRate = action.payload.questRate;
        }
      }),
    [UPDATE_QUEST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.dayQuest.findIndex(
          (q) => q.questId === action.payload.questId
        );
        draft.dayQuest[idx] = {
          ...draft.dayQuest[idx],
          questYn: action.payload.questYn,
        };
        let today = moment().format("YYYY/MM/DD");
        let _idx = draft.monthQuest.findIndex((m) => m.day === today);
        if (_idx !== -1) {
          draft.monthQuest[_idx] = action.payload.monthQuest;
          draft.monthQuest[_idx].questRate = action.payload.questRate;
        }
      }),
    [SET_MONTH_QUEST]: (state, action) =>
      produce(state, (draft) => {
        draft.monthQuest = action.payload.monthQuest;
        draft.isLoading = false;
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoading = action.payload.isLoading;
      }),
    [CHATTING]: (state, action) =>
      produce(state, (draft) => {
        draft.chat = action.payload.on_off;
      }),
    [SET_CALENDAR]: (state, action) =>
      produce(state, (draft) => {
        draft.calendar = action.payload.month;
      }),
  },
  initialState
);

const actionCreators = {
  getMonthQuestDB,
  addQuestDB,
  deleteQuestDB,
  updateQuestDB,
  onOffChat,
};

export { actionCreators };
