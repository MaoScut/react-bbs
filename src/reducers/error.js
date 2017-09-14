// import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actionTypes';

const initialState = null;
// const reducer = handleActions({
//   [ActionTypes.AUTH_ERROR](state, action) {
//     return action.payload;
//   },
// }, initialState);
// export default reducer;
export default function (state, action) {
  switch (action.type) {
    case ActionTypes.AUTH_ERROR: return action.payload;
    default: return initialState;
  }
}
