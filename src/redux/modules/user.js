import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

const SET_USER = 'SET_USER';
const LOG_OUT = 'LOG_OUT';

const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));

const initialState = {
 user: null,
 is_login: false,
}

export default handleActions({
 [SET_USER]: (state, action) => produce(state, (draft) => {
  
 }),
 [LOG_OUT]: (state, action) => produce(state, (draft) => {
  
 }),
}, initialState);

const actionCreators = {

};

export { actionCreators };