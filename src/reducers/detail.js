import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actionTypes';

const initialState = null;
export default handleActions({
  [ActionTypes.FETCH_CERTAINFOLLOWS](state, action) {
    return action.payload;
  },
}, initialState);
