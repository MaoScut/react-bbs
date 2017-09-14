import Cookie from 'js-cookie';
import * as ActionTypes from '../actionTypes';
// import * as api from '../store';
import * as api from '../store/ajax';

import history from '../history';

export function fetchArticles() {
  return (dispatch) => {
    api.fetchArticles().then(result => dispatch({
      type: ActionTypes.FETCH_ARTICLES,
      payload: result,
    }));
  };
}
export function fetchExactArticle(articleId) {
  return (dispatch) => {
    api.fetchArticles().then((result) => {
      const article = result.filter(v => v.articleId === articleId)[0];
      dispatch({
        type: ActionTypes.FETCH_EXACT_ARTICLES,
        payload: article,
      });
    });
  };
}

function errorHandler(dispatch, error, type) {
  if (error.status === 401) {
    dispatch({
      type,
      payload: 'you are not authorized to do this',
    });
  } else {
    dispatch({
      type,
      payload: error.message,
    });
  }
}

export function registerUser({ email, password }) {
  return (dispatch) => {
    api.registerUser({ email, password })
      .then(data => dispatch({ type: ActionTypes.AUTH_USER, payload: data }));
  };
}

export function loginUser({ email, password }) {
  return (dispatch) => {
    api.loginUser({ email, password }).then(() => {
      dispatch({ type: ActionTypes.AUTH_USER, payload: email });
      history.push('/');
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

export function add({ title, content, articleType }) {
  if (Cookie.get('sid')) {
    return (dispatch) => {
      api.add({
        ownerId: Cookie.get('token'),
        title,
        content,
        articleType,
      }).then(articles => dispatch({
        type: ActionTypes.FETCH_ARTICLES,
        payload: articles,
      }));
    };
  }
  return toggleLogin();
}

export function myArticles() {
  // const ownerId = Cookie.get('token');
  // const ownId = Cookie.get();
  return (dispatch) => {
    api.fetchPrivateArticles().then((result) => {
      dispatch({
        type: ActionTypes.GET_PRIVATE_ARTICLES,
        payload: result,
      });
      history.push('/private');
    });
  };
}

export function showEditor() {
  if (Cookie.get('sid')) {
    return {
      type: ActionTypes.SHOW_EDITOR,
    };
  }
  return toggleLogin();
}
export function cancelEdit() {
  return {
    type: ActionTypes.HIDE_EDITOR,
  };
}

export function saveArticle(article) {
  return (dispatch) => {
    api.save(article)
      .then(() => dispatch(fetchArticles()))
      .then(() => dispatch({
        type: ActionTypes.HIDE_EDITOR,
      }));
  };
}

export function deleteArticle(id) {
  return (dispatch) => {
    api.deleteArticle(id).then(() => dispatch(myArticles()));
  };
}
