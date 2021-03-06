function ajax(method, url, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    if (method === 'get' && data) {
      let str = '';
      Object.keys(data).forEach((k) => {
        str += `&${k}=${data[k]}`;
      });
      str = '?' + str.slice(1);
      url += str;
    }
    xhr.open(method, url);
    xhr.onreadystatechange = function h() {
      if (xhr.readyState === 4) {
        if (xhr.status === 304 || (xhr.status >= 200 && xhr.status < 300)) {
          resolve(xhr.responseText);
        } else if (xhr.status >= 400 && xhr.status < 500) {
          reject(xhr.responseText);
        } else {
          reject(JSON.stringify({
            err: {
              message: '服务器错误，请稍后重试',
            },
          }));
        }
      }
    };
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('content-type', 'application/json');
    if (data !== undefined) {
      xhr.send(JSON.stringify(data));
    } else xhr.send();
  });
}
export function fetchArticles() {
  return ajax('get', '/fetchAll').then(data => JSON.parse(data));
}

export function registerUser(registMessage) {
  return ajax('post', '/regist', registMessage).then(data => JSON.parse(data));
}

export function loginUser({ email, password }) {
  return ajax('post', '/login', { email, password }).then(result => JSON.parse(result));
}

export function save(article) {
  return ajax('post', '/save', article);
}

export function fetchPrivateArticles() {
  return ajax('get', '/fetchPrivate').then(data => JSON.parse(data));
  // return fetchArticles().then(result => result.filter(v => v.ownerId === id));
}

export function deleteArticle(id) {
  return ajax('post', '/deleteArticle', { articleId: id });
}

export function fetchCertainFollows(id) {
  return ajax('get', '/fetchFollows', { id }).then(data => JSON.parse(data));
}

export function sendReply(follow) {
  return ajax('post', '/follow', follow);
}

export function upTopic(id) {
  return ajax('post', '/upTopic', { id }).then(data => JSON.parse(data));
}

export function upFollow(obj) {
  return ajax('post', '/upFollow', obj).then(data => JSON.parse(data));
}

export function fetchTopicContent(id) {
  return ajax('get', '/fetchTopicContent', { id }).then(data => JSON.parse(data));
}
export function fetchTopic(id) {
  return ajax('get', '/fetchTopic', { id }).then(data => JSON.parse(data));
}

export function setUserHeadImg(imgUri) {
  return ajax('post', '/setUserHeadImg', { imgUri }).then(data => JSON.parse(data));
}

export function logoutUser() {
  return ajax('post', '/logout');
}
