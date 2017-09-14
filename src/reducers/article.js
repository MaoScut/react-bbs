import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actionTypes';

const inititalState = null;
export default handleActions({
  [ActionTypes.FETCH_EXACT_ARTICLES](state, action) {
    return action.payload;
  },
}, inititalState);
