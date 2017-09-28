import Cookie from 'js-cookie';
import * as ActionTypes from '../actionTypes';
import * as api from '../store/ajax';
import history from '../history';

//
// ─── TOPICS ─────────────────────────────────────────────────────────────────────
//

export function fetchTopics() {
  return (dispatch) => {
    api.fetchArticles().then(result => dispatch({
      type: ActionTypes.FETCH_TOPICS,
      payload: result,
    }));
  };
}

// function errorHandler(dispatch, error, type) {
//   if (error.status === 401) {
//     dispatch({
//       type,
//       payload: 'you are not authorized to do this',
//     });
//   } else {
//     dispatch({
//       type,
//       payload: error.message,
//     });
//   }
// }
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── AUTH ───────────────────────────────────────────────────────────────────────
//

export function needAuth() {
  return {
    type: ActionTypes.NEED_AUTH,
    payload: {
      message: '需要登录！',
    },
  };
}
export function registerUser(registMessage) {
  return (dispatch) => {
    api.registerUser(registMessage)
      .then((result) => {
        if (result.err) {
          dispatch({ type: ActionTypes.REGIST_FAIL, payload: result.err });
        } else {
          dispatch({ type: ActionTypes.AUTH_USER, payload: registMessage.userName });
        }
      });
  };
}
export function loginUser({ email, password }) {
  return (dispatch) => {
    api.loginUser({ email, password }).then((result) => {
      if (result.err) {
        dispatch({ type: ActionTypes.LOGIN_FAIL, payload: result.err });
      } else {
        dispatch({ type: ActionTypes.AUTH_USER, payload: result.acc.userName });
      }
    })
      .catch((err) => {
        dispatch({ type: ActionTypes.AUTH_ERROR, payload: JSON.parse(err) });
      });
  };
}
export function logoutUser() {
  return (dispatch) => {
    api.logoutUser().then(() => dispatch({ type: ActionTypes.UNAUTH_USER }));
    history.push('/');
  };
}
export function popLogin() {
  return {
    type: ActionTypes.POP_LOGIN,
  };
}
export function hideLogin() {
  return {
    type: ActionTypes.HIDE_LOGIN,
  };
}
export function popRegist() {
  return {
    type: ActionTypes.POP_REGIST,
  };
}
export function hideRegist() {
  return {
    type: ActionTypes.HIDE_REGIST,
  };
}
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── DETAIL ─────────────────────────────────────────────────────────────────────
// 

export function fetchCertainFollows(id) {
  return (dispatch) => {
    api.fetchCertainFollows(id).then(res => dispatch({
      type: ActionTypes.FETCH_CERTAIN_FOLLOWS,
      payload: res,
    }));
  };
}
export function fetchTopicContent(id) {
  return (dispatch) => {
    api.fetchTopicContent(id).then(topic => dispatch({
      type: ActionTypes.FETCH_TOPIC_CONTENT,
      payload: topic,
    }));
  };
}
export function fetchTopic(id) {
  return (dispatch) => {
    api.fetchTopic(id).then(topic => dispatch({
      type: ActionTypes.FETCH_TOPIC,
      payload: topic,
    }));
  };
}
export function enterTopic(topicObj) {
  return {
    type: ActionTypes.ENTER_TOPIC,
    payload: topicObj,
  };
}
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── SUBMIT ─────────────────────────────────────────────────────────────────────
//
// 提交新文章，这里不需要去验证登录，按钮点击的时候就检查过了
export function saveTopic(topic) {
  return (dispatch) => {
    api.save(topic)
      .then(() => dispatch(fetchTopics()))
      .then(() => dispatch({
        type: ActionTypes.HIDE_EDITOR,
      }));
  };
}
export function submitReply(follow) {
  return (dispatch) => {
    api.sendReply(follow).then(() => dispatch({
      type: ActionTypes.HIDE_EDITOR,
    })).then(() => dispatch(fetchCertainFollows(follow.topicId)));
  };
}

export function postUpTopic(id) {
  return {
    type: ActionTypes.POST_UP_TOPIC,
    payload: id,
  };
}
export function receiveUpTopic(id) {
  return (dispatch) => {
    api.upTopic(id).then((topic) => {
      if (topic.err) {
        // console.log(topic.err);
        dispatch({
          type: ActionTypes.LOGIN_FAIL,
          payload: topic.err,
        });
      } else {
        dispatch({
          type: ActionTypes.FETCH_TOPIC,
          payload: topic,
        });
      }
    });
  };
}

export function upFollow(obj) {
  return (dispatch) => {
    api.upFollow(obj).then(arr => dispatch({
      type: ActionTypes.FETCH_CERTAIN_FOLLOWS,
      payload: arr,
    }));
  };
}
export function postUpFollow(obj) {
  return {
    type: ActionTypes.POST_UP_FOLLOW,
    payload: obj,
  };
}
export function receiveUpFollow(obj) {
  return (dispatch) => {
    api.upFollow(obj).then(arr => dispatch({
      type: ActionTypes.FETCH_CERTAIN_FOLLOWS,
      payload: arr,
    }));
  };
}
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── EDITOR ─────────────────────────────────────────────────────────────────────
//

export function showEditor() {
  return {
    type: ActionTypes.SHOW_CREATE_EDITOR,
  };
}
export function cancelEdit() {
  return {
    type: ActionTypes.HIDE_EDITOR,
  };
}
export function showReplyEditor(topicId) {
  return {
    type: ActionTypes.SHOW_REPLY_EDITOR,
    payload: topicId,
  };
}


//
// ─── SETHEADIMG ─────────────────────────────────────────────────────────────────
//

export function setUserHeadImg(imgUri) {
  return (dispatch) => {
    api.setUserHeadImg(imgUri).then(account => dispatch({
      type: ActionTypes.SUBMIT_IMG,
      payload: account,
    }));
  };
}
// ────────────────────────────────────────────────────────────────────────────────
