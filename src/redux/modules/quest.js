import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

const SET_QUEST = 'SET_QUEST';
const ADD_QUEST = 'ADD_QUEST';
const DELETE_QUEST = 'DELETE_QUEST';
const UPDATE_QUEST = 'UPDATE_QUEST';

const setQuest = createAction(SET_QUEST, (questList) => ({ questList }));
const addQuest = createAction(ADD_QUEST, (quest) => ({ quest }));
const deleteQuest = createAction(DELETE_QUEST, (questId) => ({ questId }));
const updateQuest = createAction(UPDATE_QUEST, (questId, quest) => ({ questId, quest }));

const initialState = {
 list: [],
}

export default handleActions({
 [SET_QUEST]: (state, action) => produce(state, (draft) => {
  
 }),
 [ADD_QUEST]: (state, action) => produce(state, (draft) => {
  
 }),
 [DELETE_QUEST]: (state, action) => produce(state, (draft) => {
  
 }),
 [UPDATE_QUEST]: (state, action) => produce(state, (draft) => {
  
 }),
}, initialState);

const actionCreators = {

};

export { actionCreators };