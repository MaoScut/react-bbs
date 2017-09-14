import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actionTypes';

const initialState = null;
export default handleActions({
  [ActionTypes.GET_PRIVATE_ARTICLES](state, action) {
    return action.payload;
  },
}, initialState);
