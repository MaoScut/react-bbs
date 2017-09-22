import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actionTypes';

// const initialState = null;
const initialState = {
  topic: null,
  follows: null,
};
export default handleActions({
  [ActionTypes.FETCH_CERTAINFOLLOWS](state, action) {
    return { ...state, follows: action.payload };
  },
  [ActionTypes.FETCH_TOPIC_CONTENT](state, action) {
    const stateCopy = { ...state };
    stateCopy.topic.content = action.payload.content;
    return stateCopy;
  },
  [ActionTypes.FETCH_TOPIC](state, action) {
    return { ...state, topic: action.payload };
  },
  [ActionTypes.ENTER_TOPIC](state, action) {
    return {
      // ...state,
      topic: action.payload,
      follows: null,
    };
  },
}, initialState);
