import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actionTypes';

const initialState = {
  isEditing: false,
  article: null,
};
export default handleActions({
  [ActionTypes.SHOW_EDITOR](state) {
    return { ...state, isEditing: true };
  },
  [ActionTypes.HIDE_EDITOR](state) {
    return { ...state, isEditing: false };
  },
}, initialState);
