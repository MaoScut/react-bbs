import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actionTypes';

const initialState = null;
const reducer = handleActions({
  [ActionTypes.FETCH_ARTICLES](state, action) {
    return action.payload;
  },
}, initialState);
export default reducer;
