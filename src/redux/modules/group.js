import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";
import {config} from "../../shared/config";
import {getCookie} from "../../shared/Cookie";
import Swal from "sweetalert2";
import axios from "axios";

const GET_GROUP = "GET_GROUP";
const ADD_GROUP = "ADD_GROUP";
const DELETE_GROUP = "DELETE_GROUP";
const ADD_MEMBER = "ADD_MEMBER";
const DELETE_MEMBER = "DELETE_MEMBER";

const getGroup = createAction(GET_GROUP, (group_list)=>({group_list}));
const addGroup = createAction(ADD_GROUP, (group)=>({group}));
const deleteGroup = createAction(DELETE_GROUP, (groupId)=>({groupId}));
const addMember = createAction(ADD_MEMBER, (groupId)=>({groupId}));
const deleteMember = createAction(DELETE_MEMBER, (groupId)=>({groupId}));

const initialState={
    group_list: {
        joined: [{
            groupId:1,
            nickname:"르탄이",
            groupName:"클린코드",
            groupDesc:"리팩토링 함께 고민해요",
        },
        {
            groupId:2,
            nickname:"르탄이",
            groupName:"킹고리즘",
            groupDesc:"알고리즘을 정복할 스파르타 군대",
        }],
        unjoined: [{
            groupId:3,
            nickname:"르탄이",
            groupName:"자바스크립트포에버",
            groupDesc:"일이삼사오일이삼사오일이삼사오일이삼사오",
        },
        {
            groupId:4,
            nickname:"르탄이",
            groupName:"리액트사랑해",
            groupDesc:"미운 놈 떡 하나 더 줍시다",
        },
       ],
    
    },
    groupId : null,
    rank : [],
    
};

const getGroupDB = ()=>{
    return function (dispatch, getState, { history }) {
        
        const token = getCookie('token');
        axios.defaults.headers.common[
         "authorization"
       ] = `Bearer ${token}`; //Bearer
        axios({
            method:'get',
            url: `${config.api}/group`,
        }).then((res)=>{
            
            dispatch(getGroup(res.data));
        }).catch(err=> console.log(err));
    }
};

const addGroupDB=(groupName, groupDesc)=>{
    return function(dispatch, getState, {history}){

       let groupInfo = {
        groupName:groupName,
        groupDesc:groupDesc,
       }

        axios({
            method:'post',
            url: `${config.api}/group`,
            data:groupInfo,
        }).then((res)=>{ 
            dispatch(addGroup(groupInfo));
        }).catch(err=> console.log(err));
    }
};

const deleteGroupDB=(groupId)=>{
    return function(dispatch, getState, {history}){

        const token = getCookie('token');
        axios.defaults.headers.common[
         "authorization"
       ] = `Bearer ${token}`; //Bearer

       console.log(groupId);

       Swal.fire({
        icon: 'warning',
        title: "정말 클럽을 삭제하시겠어요?",
        showCancelButton: true,
        confirmButtonColor: "rgb(118, 118, 118)",
        confirmButtonText: '삭제',
        cancelButtonText:"취소",
      }).then((result)=>{
        if (result.isConfirmed) {

            axios({
                method:'DELETE',
                url: `${config.api}/group/:${groupId}`,
            }).then((res)=>{
                if(res.data.msg==="fail"){
                    Swal.fire({
                        text: "잠시 후 다시 시도해주세요.",
                        confirmButtonColor: "rgb(118, 118, 118)",
                      });
                }else{
                    dispatch(deleteGroup(groupId));
                    Swal.fire(
                      '삭제 완료!',
                      '클럽이 삭제되었습니다.',
                      'success'
                    )
                    
                }

          
          }).catch(err=> console.log(err));
      }});
    }
};
  
const addMemberDB = (groupId) =>{
    return function(dispatch, getState, {history}){
        axios({
            method:'post',
            url: `${config.api}/group/:${groupId}`,
           
        }).then((res)=>{ //not_login
            console.log(res.data);
            // dispatch(addGroup(groupInfo));
        }).catch(err=> console.log(err)); //소문자 author
    }
}

export default handleActions({
    [GET_GROUP]: (state, action)=> produce(state, (draft)=>{
     draft.group_list = action.payload.group_list;
    }),
    [ADD_GROUP]: (state, action)=> produce(state, (draft)=>{
        draft.group_list.unshift(action.payload.group);
    }),
    [DELETE_GROUP]: (state, action)=> produce(state, (draft)=>{
        draft.group_list = draft.group_list.filter((group)=>group.groupId !== action.payload.groupId);
    }),
    [ADD_MEMBER]: (state, action)=> produce(state, (draft)=>{
    //     let crr_group = group_list.find((group)=>group.groupId === action.payload.groupId);
    // crr_group.member.push(action.payload.user);
        draft.groupId = action.payload.groupId;
    }),
    [DELETE_MEMBER]: (state, action)=> produce(state, (draft)=>{
        draft.groupId = action.payload.groupId;
    }),
}, initialState);

const actionCreators={
getGroup,
addGroup,
deleteGroup,
addMember,
deleteMember,
getGroupDB,
addGroupDB,
deleteGroupDB,
addMemberDB,
};

export {actionCreators};
