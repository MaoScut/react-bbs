const path = require('path');
const uuid = require('uuid');
const fs = require('fs');
const follow = require('../follow');
const { writeAll, readAll } = require('../utils');

// const themesPath = path.join(__dirname, 'themes.json');
const accountPath = path.join(__dirname, 'account.json');

function getAllAccounts() {
  return readAll(accountPath);
}

// 传入的是数组
function writeAllAccounts(arr) {
  return writeAll(arr, accountPath);
}

// 根据账号和密码检索用户，成功则返回id，不成功，抛出错误
function loginCheck(email, password) {
  return getAllAccounts()
    .then(data => JSON.parse(data))
    .then((accounts) => {
      const acc = accounts.find(v => v.email === email && v.password === password);
      if (!acc) {
        throw Error('用户不存在');
      }
      return acc;
    });
}
// 注册成功，返回id和邮箱，失败就抛出异常
function registerUser({ email, password, userName }) {
  return getAllAccounts()
    .then(data => JSON.parse(data))
    .then((users) => {
      if (users.find(user => user.email === email) !== undefined) {
        throw Error('该邮箱已经注册');
      } else {
        const id = uuid.v4();
        return writeAllAccounts(users.concat({
          id,
          email,
          password,
          userName,
        })).then(() => ({ id, email, userName }));
      }
    });
}
function writeImage(data, name) {
  const imgDir = path.resolve('./dist/images/userHead', `${name}.jpg`);
  fs.writeFile(imgDir, data, (e) => {
    if (e) {
      console.log(e);
    }
  });
}

function setImg(id, imgBase64) {
  return getAllAccounts()
    .then(data => JSON.parse(data))
    .then((accounts) => {
      const target = accounts.find(v => v.id === id);
      target.hasHeadImg = '1';
      // writeAllAccounts(accounts).then(() => console.log('ok'));
      const imgUri = imgBase64.replace(/^data:image\/\w+;base64,/, '');
      const imgBuffer = new Buffer(imgUri, 'base64');
      writeAllAccounts(accounts);
      writeImage(imgBuffer, id);
      return target;
    })
    .then(account => JSON.stringify(account));
}

// module.exports.getAllThemes = getAllThemes;
module.exports.loginCheck = loginCheck;
module.exports.registerUser = registerUser;
module.exports.setImg = setImg;
module.exports.getAllAccounts = getAllAccounts;
// module.exports.fetchPrivateThemes = fetchPrivateThemes;
// module.exports.save = save;
// module.exports.deleteTheme = deleteTheme;
