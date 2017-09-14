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
      if (xhr.status === 200 && xhr.readyState === 4) {
        resolve(xhr.responseText);
      } else if (xhr.status >= 400) reject(xhr.responseText);
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

export function registerUser({ email, password }) {
  return ajax('post', '/regist', { email, password });
}

export function loginUser({ email, password }) {
  return ajax('post', '/login', { email, password });
}

export function save(article) {
  return ajax('post', '/save', article);
}

export function fetchPrivateArticles() {
  return ajax('get', '/fetchPrivate').then(data => JSON.parse(data));
  // return fetchArticles().then(result => result.filter(v => v.ownerId === id));
}

export function add() {

}
export function deleteArticle(id) {
  return ajax('post', '/deleteArticle', { articleId: id });
}

export function fetchCertainFollows(id) {
  return ajax('get', '/fetchFollows', { id }).then(data => JSON.parse(data));
}
