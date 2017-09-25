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
// export function fetchExactArticle(articleId) {
//   return (dispatch) => {
//     api.fetchArticles().then((result) => {
//       const article = result.filter(v => v.articleId === articleId)[0];
//       dispatch({
//         type: ActionTypes.FETCH_EXACT_ARTICLES,
//         payload: article,
//       });
//     });
//   };
// }

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
    Cookie.remove('sid');
    Cookie.remove('email');
    dispatch({ type: ActionTypes.UNAUTH_USER });
    history.push('/');
  };
}

export function toggleLogin() {
  return {
    type: ActionTypes.TOGGLE_LOGIN,
  };
}

export function toggleRegist() {
  return {
    type: ActionTypes.TOGGLE_REGIST,
  };
}
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── SUBMIT ─────────────────────────────────────────────────────────────────────
//

export function add({ title, content, type }) {
  if (Cookie.get('sid')) {
    return (dispatch) => {
      api.add({
        // ownerId: Cookie.get('token'),
        title,
        content,
        type,
      }).then(articles => dispatch({
        type: ActionTypes.FETCH_TOPICS,
        payload: articles,
      }));
    };
  }
  return toggleLogin();
}
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

export function upTopic(id) {
  return (dispatch) => {
    api.upTopic(id).then(topic => dispatch({
      type: ActionTypes.FETCH_TOPIC,
      payload: topic,
    }));
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

// export function deleteArticle(id) {
//   return (dispatch) => {
//     api.deleteArticle(id).then(() => dispatch(myArticles()));
//   };
// }

// export function myArticles() {
//   return (dispatch) => {
//     api.fetchPrivateArticles().then((result) => {
//       dispatch({
//         type: ActionTypes.GET_PRIVATE_ARTICLES,
//         payload: result,
//       });
//       history.push('/private');
//     });
//   };
// }
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── EDITOR ─────────────────────────────────────────────────────────────────────
//

export function showEditor() {
  if (Cookie.get('sid')) {
    return {
      type: ActionTypes.SHOW_CREATE_EDITOR,
    };
  }
  return toggleLogin();
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
