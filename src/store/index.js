import uuid from 'uuid';
import Cookie from 'js-cookie';

const STORAGE_KEY = 'BLOG';
const REGIST_LOGIN = 'REGIST_LOGIN';

export function fetchArticles() {
  return new Promise((resolve) => {
    // localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    const json = window.localStorage.getItem(STORAGE_KEY);
    setTimeout(() => {
      if (json !== null) resolve(JSON.parse(json));
      else resolve([]);
    }, 2000);
  });
}

export function receiveArticles() {
  
}

export function registerUser({ email, password }, callback) {
  const json = window.localStorage.getItem(REGIST_LOGIN);
  const users = JSON.parse(json) || [];

  if (users.find(user => user.email === email) !== undefined) {
    callback({
      message: 'this email has been registed!',
    });
  } else {
    window.localStorage.setItem(REGIST_LOGIN, JSON.stringify(users.concat({
      email,
      password,
    })));
    callback(null, email);
  }
}

export function loginUser({ email, password }, callback) {
  const json = window.localStorage.getItem(REGIST_LOGIN);
  const users = JSON.parse(json) || [];
  if (users.findIndex(user => user.email === email && user.password === password) === -1) {
    callback({
      message: 'email and password not existed!',
    });
  } else {
    callback(null, email);
  }
}

export function add(article) {
  article.articleId = uuid.v4();
  article.ownerId = Cookie.get('token');
  return fetchArticles().then((result) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(result.concat(article)));
    return result.concat(article);
  });
}

export function fetchPrivateArticles(id) {
  return fetchArticles().then(result => result.filter(v => v.ownerId === id));
}

function updateArticle(article) {
  return fetchArticles().then((articles) => {
    const index = articles.findIndex(v => v.id === articles.id);
    const newArticles = articles.slice();
    newArticles[index] = article;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newArticles));
  });
}

export function save(article) {
  if (article.id) {
    // 有id，是更新
    return updateArticle(article);
  }
  // 无id，是新建
  return add(article);
}

export function deleteArticle(id) {
  return fetchArticles().then((articles) => {
    const rest = articles.filter(v => v.articleId !== id);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
  });
}
