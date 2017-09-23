// import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actionTypes';

const initialState = {
  loginErr: null,
  registErr: null,
};
// const reducer = handleActions({
//   [ActionTypes.AUTH_ERROR](state, action) {
//     return action.payload;
//   },
// }, initialState);
// export default reducer;
export default function (state, action) {
  switch (action.type) {
    case ActionTypes.LOGIN_FAIL:
      return {
        loginErr: action.payload,
      };
    case ActionTypes.REGIST_FAIL:
      return {
        registErr: action.payload,
      };
    default: return initialState;
  }
}
