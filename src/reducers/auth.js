import { handleActions } from 'redux-actions';
import Cookie from 'js-cookie';
import * as ActionTypes from '../actionTypes';

const initialState = {
  auth: false,
  name: undefined,
  login: false,
  regist: false,
};
if (Cookie.get('sid')) {
  initialState.auth = true;
  initialState.name = Cookie.get('email');
}
const reducer = handleActions({
  [ActionTypes.AUTH_USER](state, action) {
    return {
      auth: true,
      name: action.payload,
    };
  },
  [ActionTypes.UNAUTH_USER]() {
    return {
      auth: false,
      name: undefined,
    };
  },
  [ActionTypes.TOGGLE_LOGIN](state) {
    return { ...state, login: !state.login };
  },
  [ActionTypes.TOGGLE_REGIST](state) {
    return { ...state, regist: !state.regist };
  },
}, initialState);
export default reducer;
