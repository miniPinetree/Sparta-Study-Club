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
const deleteGroup = createAction(DELETE_GROUP, (group)=>({group}));
const addMember = createAction(ADD_MEMBER, (group)=>({group}));
const deleteMember = createAction(DELETE_MEMBER, (group)=>({group}));

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

const getRankDB = (groupId) =>{
    return function (dispatch, getState, { history }) {
        axios({
            method:'get',
            url: `${config.api}/group/:${groupId}/rank`,
        }).then((res)=>{
            console.log("랭크",res.data);
            // dispatch(getGroup(res.data));
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

const deleteGroupDB=(group)=>{
    return function(dispatch, getState, {history}){

        const token = getCookie('token');
        axios.defaults.headers.common[
         "authorization"
       ] = `Bearer ${token}`; //Bearer

       console.log(group.groupId);

       Swal.fire({
        icon: 'warning',
        title: "정말 클럽을 삭제하시겠어요?",
        showCancelButton: true,
        confirmButtonColor: "rgb(118, 118, 118)",
        confirmButtonText: '삭제',
        cancelButtonText:"취소",
        cancelButtonColor:"#E2344E",
      }).then((result)=>{
        if (result.isConfirmed) {

            axios({
                method:'DELETE',
                url: `${config.api}/group/:${group.groupId}`,
            }).then((res)=>{
                if(res.data.msg==="fail"){
                    Swal.fire({
                        text: "잠시 후 다시 시도해주세요.",
                        confirmButtonColor: "rgb(118, 118, 118)",
                      });
                }else{
                    dispatch(deleteGroup(group));
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
  
const addMemberDB = (group) =>{
    return function(dispatch, getState, {history}){

        const token = getCookie('token');
        axios.defaults.headers.common[
         "authorization"
       ] = `Bearer ${token}`; //Bearer

        axios({
            method:'post',
            url: `${config.api}/group/:${group.groupId}`,
        }).then((res)=>{ 
            console.log(res.data);
            if(res.data.msg==="fail"){
                Swal.fire({
                    text: "잠시 후 다시 시도해주세요.",
                    confirmButtonColor: "rgb(118, 118, 118)",
                  });

            }else{
                dispatch(addMember(group));
                Swal.fire("가입 완료!","success");
            }
        }).catch(err=> console.log(err)); 
    }
}

const deleteMemberDB=(group)=>{
    return function(dispatch, getState, {history}){
        const token = getCookie('token');
        axios.defaults.headers.common[
         "authorization"
       ] = `Bearer ${token}`; //Bearer

       console.log(group);

       Swal.fire({
        icon: 'warning',
        title: "정말 클럽을 탈퇴하시겠어요?",
        showCancelButton: true,
        confirmButtonColor: "rgb(118, 118, 118)",
        confirmButtonText: '탈퇴;',
        cancelButtonText:"취소",
        cancelButtonColor:"#E2344E",
      }).then((result)=>{
        if (result.isConfirmed) {

            axios({
                method:'DELETE',
                url: `${config.api}/group/:${group.groupId}`,
            }).then((res)=>{
                if(res.data.msg==="fail"){
                    Swal.fire({
                        text: "잠시 후 다시 시도해주세요.",
                        confirmButtonColor: "rgb(118, 118, 118)",
                      });
                }else{
                    dispatch(deleteGroup(group));
                    Swal.fire(
                      '탈퇴 완료!',
                      'success'
                    )
                    
                }
          }).catch(err=> console.log(err));
      }});
    }
};

export default handleActions({
    [GET_GROUP]: (state, action)=> produce(state, (draft)=>{
     draft.group_list = action.payload.group_list;
    }),
    [ADD_GROUP]: (state, action)=> produce(state, (draft)=>{
        draft.group_list.joined.unshift(action.payload.group);
    }),
    [DELETE_GROUP]: (state, action)=> produce(state, (draft)=>{
        draft.group_list.joined = draft.group_list.joined.filter((group)=>group.groupId !== action.payload.group.groupId);
    }),
    [ADD_MEMBER]: (state, action)=> produce(state, (draft)=>{
        draft.group_list.joined.unshift(action.payload.group);
        draft.group_list.unjoined =  draft.group_list.unjoined.filter((group)=>group.groupId !== action.payload.group.groupId);
    }),
    [DELETE_MEMBER]: (state, action)=> produce(state, (draft)=>{
        draft.group_list.joined = draft.group_list.joined.filter((group)=>group.groupId !== action.payload.group.groupId);
        draft.group_list.unjoined.unshift(action.payload.group)
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
getRankDB,
deleteMemberDB,
};

export {actionCreators};
