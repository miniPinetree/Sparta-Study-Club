
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from "axios";
import { config } from "../../shared/config";
import moment from 'moment';
import Swal from "sweetalert2";

const SET_QUEST = 'SET_QUEST';
const ADD_QUEST = 'ADD_QUEST';
const DELETE_QUEST = 'DELETE_QUEST';
const UPDATE_QUEST = 'UPDATE_QUEST';
const SET_MONTH_QUEST = 'SET_MONTH_QUEST';
const LOADING = 'LOADING';
const setQuest = createAction(SET_QUEST, (dayQuest) => ({ dayQuest }));
const addQuest = createAction(ADD_QUEST, (quest) => ({ quest }));
const deleteQuest = createAction(DELETE_QUEST, (questId) => ({ questId }));
const updateQuest = createAction(UPDATE_QUEST, (questId,questYn) => ({ questId,questYn}));
const setMonthQuest = createAction(SET_MONTH_QUEST, (monthQuest) => ({monthQuest}));
const loading = createAction(LOADING, (isLoading) => ({ isLoading }));
const initialState = {
 dayQuest: [],
 monthQuest: [],
 isLoading :false,
}

const getMonthQuestDB = (month = null) => {
 return function (dispatch, getState, { history }) {
  
  if (!month) {
   return;
  }
  dispatch(loading(true));
  axios({
   method: 'get',
   url: `${config.api}/calendar/${month}`,
  }).then((res) => {
   let _monthQuest = [...res.data.studyData];
   dispatch(setMonthQuest(_monthQuest));
  
   let today = moment().format('YYYY/MM/DD');
   let _dayQuest = _monthQuest.find((m) => m.day === today);
   //시간 설정이 되어 오늘 정보가 있다면..
   if (_dayQuest) {
    dispatch(setQuest(_dayQuest.quest));
   }
  }).catch(err => console.log(err));
 }
}

const addQuestDB = (questContents =null) => {
 return function (dispacth, getState, { history }) {
  if (!questContents) {
   Swal.fire({
    text: '내용을 입력해주세요!',
    confirmButtonColor: '#E3344E',
   })
   return false;
  }

  axios({
   method: 'post',
   url: `${config.api}/quest`,
   data: {
    questContents: questContents,
   },
  }).then((res) => {
   if (res.data.msg === 'success') {
    let quest = {
     questId: res.data.questId,
     questContents: res.data.questContents,
     questYn : false,
    }
    dispacth(addQuest(quest));

   } else {
    console.log('퀘스트 등록 실패..');
   }
  }).catch(err => console.log(err));
 }
}

const deleteQuestDB = (questId=null) => {
 return function (dispacth, getState, { history }) {
  if (!questId) {
   return false;
  }

  axios({
   method: 'delete',
   url: `${config.api}/quest/${questId}`,
  }).then((res) => {
   if (res.data.msg === 'success') {
    dispacth(deleteQuest(questId));
   } else {
    console.log('퀘스트 삭제 실패..');
   }

  }).catch(err => console.log(err));

 }
}

const updateQuestDB = (questId= null) => {
 return function (dispacth, getState, { history }) { 
  
  if (!questId) {
   return false;
  }
 
  const quest = getState().dayQuest.find((q) => q.questId === questId);
  let questYn = quest.questYn?false:true;

  axios({
   method: 'patch',
   url: `${config.api}/quest`,
   data: {
    questId: questId,
    questYn: questYn,
   },
  }).then((res) => {
   if (res.data.msg === 'success') {
    dispacth(updateQuest(questId, questYn));
   } else {
    console.log('퀘스트 업데이트 실패..');
   }
  })

 }
}



export default handleActions({
 [SET_QUEST]: (state, action) => produce(state, (draft) => {
  draft.dayQuest = action.payload.dayQuest;
 }),
 [ADD_QUEST]: (state, action) => produce(state, (draft) => {
  draft.list.push(action.payload.quest);
 }),
 [DELETE_QUEST]: (state, action) => produce(state, (draft) => {
  let idx = draft.dayQuest.findIndex((q) => q.questId === action.payload.questId);
  draft.dayQuest.splice(idx, 1);
 }),
 [UPDATE_QUEST]: (state, action) => produce(state, (draft) => {
  let idx = draft.dayQuest.findIndex((q) => q.questId === action.payload.questId);
  draft.dayQuest[idx] = { ...draft.dayQuest[idx], questYn: action.payload.questYn };
 }),
 [SET_MONTH_QUEST]: (state, action) => produce(state, (draft) => {
  draft.monthQuest = action.payload.monthQuest;
  draft.isLoading = false;
 }),
 [LOADING]: (state, action) => produce(state, (draft) => {
  draft.isLoading = action.payload.isLoading;
 }),
}, initialState);

const actionCreators = {
 getMonthQuestDB,
 addQuestDB,
 deleteQuestDB,
 updateQuestDB,
};

export { actionCreators };
