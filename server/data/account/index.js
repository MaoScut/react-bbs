const path = require('path');
const uuid = require('uuid');
const fs = require('fs');
const { writeAll, readAll, createError } = require('../utils');

const accountPath = path.join(__dirname, 'account.json');

function getAllAccounts() {
  return readAll(accountPath);
}

// 传入的是数组
function writeAllAccounts(arr) {
  return writeAll(arr, accountPath);
}

// 根据账号和密码检索用户
function loginCheck(email, password) {
  return getAllAccounts()
    .then(data => JSON.parse(data))
    .then((accounts) => {
      const acc = accounts.find(v => v.email === email && v.password === password);
      if (!acc) {
        return {
          err: createError('用户不存在或者用户名和密码不匹配！'),
        };
      }
      return { acc };
    });
}
// 注册成功，返回id和邮箱
function registerUser({ email, password, userName }) {
  return getAllAccounts()
    .then(data => JSON.parse(data))
    .then((users) => {
      if (users.find(user => user.email === email) !== undefined) {
        return {
          err: createError('该邮箱已被注册！'),
        };
      }
      const id = uuid.v4();
      return writeAllAccounts(users.concat({
        id,
        email,
        password,
        userName,
        headImg: `/images/userHead/default/${userName[0].toUpperCase()}.png`,
      })).then(() => ({
        acc: { id, email, userName },
      }
      ));
    });
}
function writeImage(data, name) {
  const imgDir = path.resolve('./dist/images/userHead', `${name}.png`);
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
      const imgName = uuid.v4();
      const target = accounts.find(v => v.id === id);
      target.headImg = `/images/userHead/${imgName}.png`;
      // writeAllAccounts(accounts).then(() => console.log('ok'));
      const imgUri = imgBase64.replace(/^data:image\/\w+;base64,/, '');
      const imgBuffer = new Buffer(imgUri, 'base64');
      writeAllAccounts(accounts);
      writeImage(imgBuffer, imgName);
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
