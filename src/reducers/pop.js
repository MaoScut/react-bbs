import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actionTypes';

const initialState = {
  login: false,
  regist: false,
};
const reducer = handleActions({
  [ActionTypes.TOGGLE_LOGIN](state) {
    return { ...state, login: !state.login };
  },
  [ActionTypes.TOGGLE_REGIST](state) {
    return { ...state, regist: !state.regist };
  },
  // 登录成功或者注册成功，都要关闭弹框
  [ActionTypes.AUTH_USER]() {
    return { login: false, regist: false };
  },
}, initialState);

export default reducer;
