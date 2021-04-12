import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";

//actions
const GET_STUDY = 'GET_STUDY';
const SET_STUDY = 'SET_STUDY';
const UPDATE_STUDY = 'UPDATE_QUEST';
//action creactors
const getStudy = createAction(GET_STUDY, (studyList) => ({ studyList }));
const setStudy = createAction(SET_STUDY, (studyTime) => ({ studyTime }));
const updateStudy = createAction(UPDATE_STUDY, (studyTime) => ({ studyTime }));

const initialState = {
 list: [],
}
//reducer
export default handleActions({
 [GET_STUDY]: (state, action) => produce(state, (draft) => {
  
 }),
 [SET_STUDY]: (state, action) => produce(state, (draft) => {
  
 }),
 [UPDATE_STUDY]: (state, action) => produce(state, (draft) => {
  
 }),
}, initialState);

const actionCreators = {

};

export { actionCreators };