import * as ActionTypes from '../actionTypes';
import * as actions from '../action/async';

const map = {
  [ActionTypes.SHOW_CREATE_EDITOR]: actions.showEditor,
  [ActionTypes.SHOW_REPLY_EDITOR]: actions.showReplyEditor,
  [ActionTypes.POST_UP_TOPIC]: actions.receiveUpTopic,
  [ActionTypes.POST_UP_FOLLOW]: actions.receiveUpFollow,
};
const checkAuth = store => next => (action) => {
  if (map[action.type]) {
    if (!store.getState().auth.auth) {
      next(actions.needAuth());
    } else {
      next(map[action.type](action.payload));
    }
  } else {
    next(action);
  }
};
export default checkAuth;
