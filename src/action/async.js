import * as ActionTypes from '../actionTypes';
import * as api from '../store/ajax';
import history from '../history';

//
// ─── TOPICS ─────────────────────────────────────────────────────────────────────
//
// 获取首页主题（不带内容），home视图调用
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

//
// ─── AUTH ───────────────────────────────────────────────────────────────────────
//
/**
 * 当进行了需要登录的操作而没有登录的时候，会调用这个action
 */
export function needAuth() {
  return {
    type: ActionTypes.NEED_AUTH,
    payload: {
      message: '需要登录！',
    },
  };
}
/**
 * 按下注册按钮时调用
 * reigstMessage: { email, userName, password }
 * 调用之前请验证参数的格式
 */ 
export function registUser(registMessage) {
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
/**
 * 注册按钮调用该action
 * @param {Object} param0 
 */
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
/**
 * 退出登录
 */
export function logoutUser() {
  return (dispatch) => {
    api.logoutUser().then(() => dispatch({ type: ActionTypes.UNAUTH_USER }));
    history.push('/');
  };
}
/**
 * 弹出登录框
 */
export function popLogin() {
  return {
    type: ActionTypes.POP_LOGIN,
  };
}
/**
 * 隐藏登录框
 */
export function hideLogin() {
  return {
    type: ActionTypes.HIDE_LOGIN,
  };
}
/**
 * 弹出注册框
 */
export function popRegist() {
  return {
    type: ActionTypes.POP_REGIST,
  };
}
/**
 * 隐藏注册框
 */
export function hideRegist() {
  return {
    type: ActionTypes.HIDE_REGIST,
  };
}

//
// ─── DETAIL ─────────────────────────────────────────────────────────────────────
// 

/**
 * 获取特定主题的跟帖
 * @param {String} id 主题的id
 */
export function fetchCertainFollows(id) {
  return (dispatch) => {
    api.fetchCertainFollows(id).then(res => dispatch({
      type: ActionTypes.FETCH_CERTAIN_FOLLOWS,
      payload: res,
    }));
  };
}
/**
 * 获取特定主题的content
 * @param {String} id 主题的id
 */
export function fetchTopicContent(id) {
  return (dispatch) => {
    api.fetchTopicContent(id).then(topic => dispatch({
      type: ActionTypes.FETCH_TOPIC_CONTENT,
      payload: topic,
    }));
  };
}
/**
 * 获取特定主题的所有信息（但是不包括跟帖）
 * @param {String} id 主题id
 */
export function fetchTopic(id) {
  return (dispatch) => {
    api.fetchTopic(id).then(topic => dispatch({
      type: ActionTypes.FETCH_TOPIC,
      payload: topic,
    }));
  };
}
/**
 * 点击首页某个主题后触发，把信息放到state中
 * @param {Object} topicObj 
 */
export function enterTopic(topicObj) {
  return {
    type: ActionTypes.ENTER_TOPIC,
    payload: topicObj,
  };
}

//
// ─── SUBMIT ─────────────────────────────────────────────────────────────────────
//
/**
 * 新建主题后的保存
 * @param {Object} topic 主题，要有title，content，type属性
 */
export function saveTopic(topic) {
  return (dispatch) => {
    api.save(topic)
      .then(() => dispatch(fetchTopics()))
      .then(() => dispatch({
        type: ActionTypes.HIDE_EDITOR,
      }));
  };
}
/**
 * 提交跟帖
 * @param {Object} follow 跟帖，要有content，topicId（当前主题的id）
 */
export function submitReply(follow) {
  return (dispatch) => {
    api.sendReply(follow).then(() => dispatch({
      type: ActionTypes.HIDE_EDITOR,
    })).then(() => dispatch(fetchCertainFollows(follow.topicId)));
  };
}
/**
 * 准备点赞主题，发起该action后，要检查是否登录
 * @param {String} id 主题的id
 */
export function postUpTopic(id) {
  return {
    type: ActionTypes.POST_UP_TOPIC,
    payload: id,
  };
}
/**
 * 点赞成功后，发起改action
 * @param {String} id 主题的id
 */
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
/**
 * 点赞发起的action，要根据有无登录去决定是否对服务器发起请求
 * @param {Obj} obj 包含跟帖id的obj
 */
export function postUpFollow(obj) {
  return {
    type: ActionTypes.POST_UP_FOLLOW,
    payload: obj,
  };
}
/**
 * 点赞成功后发起该action
 * @param {Obj} obj 
 */
export function receiveUpFollow(obj) {
  return (dispatch) => {
    api.upFollow(obj).then(arr => dispatch({
      type: ActionTypes.FETCH_CERTAIN_FOLLOWS,
      payload: arr,
    }));
  };
}

//
// ─── EDITOR ─────────────────────────────────────────────────────────────────────
//
/**
 * 弹出编辑框，新建主题的时候调用
 */
export function showEditor() {
  return {
    type: ActionTypes.SHOW_CREATE_EDITOR,
  };
}
/**
 * 关闭编辑框
 */
export function cancelEdit() {
  return {
    type: ActionTypes.HIDE_EDITOR,
  };
}
/**
 * 回复某个主题，需要验证登录
 * @param {String} topicId 当前主题的id
 */
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
