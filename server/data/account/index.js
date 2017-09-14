const path = require('path');
const uuid = require('uuid');
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
function registerUser(email, password) {
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
        })).then(() => ({ id, email }));
      }
    });
}

// module.exports.getAllThemes = getAllThemes;
module.exports.loginCheck = loginCheck;
module.exports.registerUser = registerUser;
// module.exports.fetchPrivateThemes = fetchPrivateThemes;
// module.exports.save = save;
// module.exports.deleteTheme = deleteTheme;
