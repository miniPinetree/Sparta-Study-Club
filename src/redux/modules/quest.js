
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from "axios";
import { config } from "../../shared/config";
import moment from 'moment';
import Swal from "sweetalert2";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
const SET_QUEST = 'SET_QUEST';
const ADD_QUEST = 'ADD_QUEST';
const DELETE_QUEST = 'DELETE_QUEST';
const UPDATE_QUEST = 'UPDATE_QUEST';
const SET_MONTH_QUEST = 'SET_MONTH_QUEST';
const LOADING = 'LOADING';
const CHATTING = 'CHATTING';

const setQuest = createAction(SET_QUEST, (dayQuest) => ({ dayQuest }));
const addQuest = createAction(ADD_QUEST, (quest,questRate) => ({ quest,questRate }));
const deleteQuest = createAction(DELETE_QUEST, (questId,questRate) => ({ questId,questRate }));
const updateQuest = createAction(UPDATE_QUEST, (questId,questYn,questRate) => ({ questId,questYn,questRate}));
const setMonthQuest = createAction(SET_MONTH_QUEST, (monthQuest) => ({monthQuest}));
const loading = createAction(LOADING, (isLoading) => ({ isLoading }));
const setChatting = createAction(CHATTING, (on_off) => ({ on_off }));

const initialState = {
 
  
  dayQuest: [
    
  ],
 monthQuest: [
  {
   'day': '2021/04/08',
   'questRate': 100,
   'studyTime': String(new Date(2021, 3, 8, 12, 0, 10, 22).getTime()),
   'studySetTime': 3,
   'quest': [
    {
     'questId': 1,
     'questContents': '자바스크립트 공부하기',
     'questYn': true,
    },
    {
     'questId': 2,
     'questContents': '메인페이지 view 작업하기',
     'questYn': true,
    }
   ],
  },
  {
 'day': '2021/04/09',
 'questRate': 50,
 'studyTime': String(new Date(2021, 3, 9, 2, 30, 40, 0).getTime()),
 'studySetTime': 5,
 'quest': [
  {
   'questId': 3,
   'questContents': '회원가입 및 로그인 기능 완료하기',
   'questYn': false,
  },
  {
   'questId': 4,
   'questContents': '리액트 doc 참고 공부하기',
   'questYn': false,
  },
  {
   'questId': 5,
   'questContents': '밥 먹기',
   'questYn': true,
  },
  {
   'questId': 6,
   'questContents': '잠자기',
   'questYn': true,
  },
 ],
  },
  {
 'day': '2021/04/10',
 'questRate': 0,
 'studyTime': String(new Date(2021, 3, 11, 19, 22, 0, 0).getTime()),
 'studySetTime': 2,
 'quest': [
  {
   'questId': 7,
   'questContents': '메인페이지 css 수정하기',
   'questYn': false,
  },
  {
   'questId': 8,
   'questContents': 'post 기능 만들기',
   'questYn': false,
  },
  
 ],
},
{
   'day': '2021/04/11',
   'questRate': 50,
   'studyTime': String(new Date(2021, 3, 11, 19, 0, 40, 30).getTime()),
   'studySetTime': 4,
   'quest': [
    {
     'questId': 9,
     'questContents': 'git 공부하기',
     'questYn': true,
    },
    {
     'questId': 10,
     'questContents': '웹소켓 알아보기',
     'questYn': false,
    }
   ],
  },  
  {
    'day': '2021/04/12',
    'questRate': 50,
    'studyTime': String(new Date(2021, 3, 11, 19, 0, 40, 30).getTime()),
    'studySetTime': 3,
    'quest': [
     {
      'questId': 11,
      'questContents': '밥먹기',
      'questYn': true,
     },
     {
      'questId': 12,
      'questContents': '잠자기',
      'questYn': false,
     }
    ],
   }

 ],
 isLoading: false,
 chat : true,
}

//월 리스트가 없을 때 빈 리스트로 오는지 null로 오는지?
const getMonthQuestDB = (date = null) => {
  return function (dispatch, getState, { history }) {
  
  const token = getCookie('token');
  if (!date) {
    return;
  }
  let year = date.substring(0,4);
  let month = date.substring(date.length - 1, date.length);
  
  let today = moment();
  console.log(year, month,today);
  
  dispatch(loading(true));
  axios({
    method: 'get',
    headers: {
      "authorization":`Bearer ${token}`,
    },
    url: `${config.api}/quest/calendar?year=${year}&month=${month}`,
  }).then((res) => {

    if (res.data.msg === 'success') {
      console.log(res)
      const _data = res.data.data;
      //날짜만 뽑아서 중복 제거.
      const _day = _data.map((d) => d.day);
      const day = _day.filter((d, idx) => {
        return _day.indexOf(d) === idx;
      });
      const _monthQuest = [];
      day.forEach((d) => {
        let keyDay = { day: d, };
        _monthQuest.push(keyDay);
      })
      
      _monthQuest.forEach((d, idx) => {
        //처음나오는 날로 기본 세팅.
        const findData = _data.find((_d) => _d.day === d.day)
        const basicSetting = {
          studyTime: findData.studyTimeStamp,
          studySetTime: findData.studySetTime,
          questRate: findData.questRate,
          quest: [],
        };
        _monthQuest[idx] = { ..._monthQuest[idx], ...basicSetting };

        _data.forEach((_d) => {
          //퀘스트 날짜별로 추가.          
          if (d.day === _d.day) {
            let _quest = {
              questId: _d.questId,
              questContents: _d.questContents,
              questYn: _d.questYn===0?false:true,
            }
            _monthQuest[idx].quest.push(_quest);
          }
        })
      })

      dispatch(setMonthQuest(_monthQuest));
      
      let today = moment().format('YYYY/MM/DD');
      let _dayQuest = _monthQuest.find((m) => m.day === today);
      //시간 설정이 되어 오늘 정보가 있다면..
      if (_dayQuest) {
        dispatch(setQuest(_dayQuest.quest));
      }
      
    } else {
      console.log(res.data.msg);
      Swal.fire({
      html:'<br>퀘스트를 조회하지 못했습니다.😪<br>',
      confirmButtonColor: '#E3344E',
    });    
    }
  }).catch(err => console.log(err));
 }
}



const addQuestDB = (questContents =null) => {
 return function (dispacth, getState, { history }) {

  const userTodayId = getState().user.user.userTodayId;
  if (!questContents) {
   Swal.fire({
    text: '내용을 입력해주세요!✏️',
    confirmButtonColor: '#E3344E',
   });
   return false;
   }

  axios({
   method: 'post',
   url: `${config.api}/quest`,
   data: {
    questContents: questContents,
    userTodayId : userTodayId,
   },
  }).then((res) => {
   if (res.data.msg === 'success') {
    let quest = {
     questId: res.data.questId,
     questContents: res.data.questContents,
     questYn : false,
    }
    dispacth(addQuest(quest,res.data.questRate));

   } else {
    Swal.fire({
     text: '퀘스트 등록에 실패했습니다. ',
     confirmButtonColor: '#E3344E',
    });       
   }
  }).catch(err => console.log(err));
  
 }
}

//채팅방 클릭 on/off
const onOffChat = () => {
 return function (dispacth, getState, { history }) {

  let _chat = getState().quest.chat;
  _chat = _chat ? false : true;
  dispacth(setChatting(_chat));
 }
}
//userTodayId body에 같이 실어서 보내기 추가만.
const deleteQuestDB = (questId=null) => {
  return function (dispacth, getState, { history }) {
  const token = getCookie('token');
  const userTodayId = getState().user.user.userTodayId;
    console.log(`userToday: ${userTodayId} questId: ${questId}`)
  if (!questId || !userTodayId) {
    console.log('questId 혹은 userTodayId가 없습니다.');
  return false;
  }

  axios({
   method: 'delete',
   url: `${config.api}/quest`,
    header: {
      "authorization":`Bearer ${token}`,
    },
   data:{
    userTodayId:userTodayId,
    questId:questId,
   },
  }).then((res) => {
    
   if (res.data.msg === 'success') {
    dispacth(deleteQuest(questId,res.data.questRate));
   } else {
     
     Swal.fire({
     text: '퀘스트 삭제를 실패했습니다. ',
     confirmButtonColor: '#E3344E',
    });    
   }

  }).catch(err => console.log(err));

 }
}
//userTodayId body에 같이 실어서 보내기 추가만.
const updateQuestDB = (questId= null) => {
 return function (dispacth, getState, { history }) { 
  
  const userTodayId = getState().user.user.userTodayId;
   
   if (!questId || !userTodayId) {
    console.log('questId 혹은 userTodayId가 없습니다.');
    return false;
  }
 
  const quest = getState().quest.dayQuest.find((q) => q.questId === questId);
  let questYn = quest.questYn ? false : true;
  //서버 연동시 밑에 활성화
  //dispacth(updateQuest(questId,questYn))

  
  axios({
   method: 'patch',
   url: `${config.api}/quest`,
   data: {
    userTodayId: userTodayId,
    questId: questId,
    questYn: questYn,
   },
  }).then((res) => {
   if (res.data.msg === 'success') {
    dispacth(updateQuest(questId, questYn,res.data.questRate));
   } else {
     Swal.fire({
     text: '퀘스트 업데이트에 실패했습니다. ',
     confirmButtonColor: '#E3344E',
    });  
   }
  })

 }
}

export default handleActions({
 [SET_QUEST]: (state, action) => produce(state, (draft) => {
   draft.dayQuest = action.payload.dayQuest;
  
 }),
 [ADD_QUEST]: (state, action) => produce(state, (draft) => {
   draft.dayQuest.push(action.payload.quest);
   let today = moment().format('YYYY/MM/DD');
   let idx = draft.monthQuest.findIndex((m) => m.day === today);
   if (idx !== -1) {
       draft.monthQuest[idx].questRate = action.payload.questRate;
   }
 }),
 [DELETE_QUEST]: (state, action) => produce(state, (draft) => {
  let idx = draft.dayQuest.findIndex((q) => q.questId === action.payload.questId);
  draft.dayQuest.splice(idx, 1);
  let today = moment().format('YYYY/MM/DD');
  let _idx = draft.monthQuest.findIndex((m) => m.day === today);
   if (_idx !== -1) {
   draft.monthQuest[_idx].questRate = action.payload.questRate;
   }
 }),
 [UPDATE_QUEST]: (state, action) => produce(state, (draft) => {
  let idx = draft.dayQuest.findIndex((q) => q.questId === action.payload.questId);
  draft.dayQuest[idx] = { ...draft.dayQuest[idx], questYn: action.payload.questYn };
  let today = moment().format('YYYY/MM/DD');
  let _idx = draft.monthQuest.findIndex((m) => m.day === today);
   if (_idx !== -1) {
     draft.monthQuest[_idx].questRate = action.payload.questRate; 
   }
 }),
 [SET_MONTH_QUEST]: (state, action) => produce(state, (draft) => {
  draft.monthQuest = action.payload.monthQuest;
  draft.isLoading = false;
 }),
 [LOADING]: (state, action) => produce(state, (draft) => {
  draft.isLoading = action.payload.isLoading;
 }),
 [CHATTING]: (state, action) => produce(state, (draft) => {
  draft.chat = action.payload.on_off;
 }),
}, initialState);

const actionCreators = {
 getMonthQuestDB,
 addQuestDB,
 deleteQuestDB,
 updateQuestDB,
 onOffChat,
};

export { actionCreators };

/*
const _data = [
  {userTodayId: '89432423-34234-234324-3423424-3423424234',
    day: '2021/04/14',
    studyTime: '2021-04-13T20:19:51.2342',
    studyTimeStamp: '1231231232.3423432',
    studySetTime: 5,
    questRate: 0,
    questId: '4324324-34234sfs-sdfdsfsd-sfdf',
    questContents: '그림그리기',
    questYn: true,
    email: 'dfsdf@dsf.com'
  },
  {userTodayId: '89432423-34234-234324-3423424-3423424234',
    day: '2021/04/14',
    studyTime: '2021-04-13T20:19:51.2342',
    studyTimeStamp: '1231231232.3423432',
    studySetTime: 5,
    questRate: 0,
    questId: '4324324-34234sfs-sdfdsfsd-sfdf',
    questContents: '공부하기',
    questYn: true,
    email: 'dfsdf@dsf.com'
  },
  {userTodayId: '89432423-34234-234324-3423424-3423424234',
    day: '2021/04/16',
    studyTime: '2021-04-13T20:19:51.2342',
    studyTimeStamp: '1231231232.3423432',
    studySetTime: 3,
    questRate: 0,
    questId: '4324324-34234sfs-sdfdsfsd-sfdf',
    questContents: '잠자기',
    questYn: true,
    email: 'dfsdf@dsf.com'
  },

]

*/