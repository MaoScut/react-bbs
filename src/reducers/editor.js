import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actionTypes';

const initialState = {
  create: false,
  update: false,
  reply: false,
  topicId: null, // detail页面的帖子id
};
export default handleActions({
  [ActionTypes.SHOW_CREATE_EDITOR](state) {
    return { ...state, create: true };
  },
  [ActionTypes.HIDE_EDITOR]() {
    return { ...initialState };
  },
  [ActionTypes.SHOW_REPLY_EDITOR](state, action) {
    return { ...state, reply: true, topicId: action.payload };
  },
}, initialState);
