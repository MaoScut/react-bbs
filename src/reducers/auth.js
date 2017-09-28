import { handleActions } from 'redux-actions';
import Cookie from 'js-cookie';
import * as ActionTypes from '../actionTypes';

const initialState = {
  auth: false,
  name: undefined,
  login: false,
  regist: false,
};
if (Cookie.get('userName')) {
  initialState.auth = true;
  initialState.name = Cookie.get('userName');
}
const reducer = handleActions({
  [ActionTypes.AUTH_USER](state, action) {
    return {
      auth: true,
      name: action.payload,
    };
  },
  [ActionTypes.LOGIN_FAIL](state) {
    return { ...state, login: !state.login };
  },
  [ActionTypes.NEED_AUTH](state) {
    return { ...state, login: true };
  },
  [ActionTypes.UNAUTH_USER]() {
    return {
      auth: false,
      name: undefined,
    };
  },
  [ActionTypes.POP_LOGIN](state) {
    return { ...state, login: true };
  },
  [ActionTypes.HIDE_LOGIN](state) {
    return { ...state, login: false };
  },
  [ActionTypes.POP_REGIST](state) {
    return { ...state, regist: true };
  },
  [ActionTypes.HIDE_REGIST](state) {
    return { ...state, regist: false };
  },
}, initialState);
export default reducer;
