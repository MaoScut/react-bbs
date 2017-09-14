// const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const { writeAll, readAll } = require('../utils');

const themesPath = path.join(__dirname, 'themes.json');
// const accountPath = path.join(__dirname, 'account.json');

function getAllThemes() {
  return readAll(themesPath);
}

function writeAllThemes(arr) {
  return writeAll(arr, themesPath);
}

function fetchPrivateThemes(id) {
  return getAllThemes()
    .then(data => JSON.parse(data))
    .then(result => result.filter(v => v.ownerId === id))
    .then(result => JSON.stringify(result || []));
}

function add(theme) {
  // article.articleId = uuid.v4();
  // article.ownerId = ownerId;
  return getAllThemes()
    .then(data => JSON.parse(data))
    .then(result => writeAllThemes(result.concat(createTheme(theme))));
}
function updateTheme(theme) {
  return getAllThemes()
    .then(data => JSON.parse(data))
    .then((themes) => {
      const index = themes.findIndex(v => v.id === articles.id);
      const newThemes = themes.slice();
      newThemes[index] = theme;
      return writeAllArticles(newThemes);
    });
}

function save(theme) {
  if (theme.id) {
    // 有id，是更新
    return updateTheme(theme);
  }
  // 无id，是新建
  return add(theme);
}

function deleteTheme(id) {
  return getAllThemes()
    .then(data => JSON.parse(data))
    .then(themes => writeAllThemes(themes.filter(theme => theme.id !== id)));
}

function createTheme(theme) {
  // const newTheme = {
  //   ...theme,
  //   id: uuid.v4(),
  //   date: new Date(),
  //   upNum: 0,
  //   scanNum: 0,
  //   lastReply: new Date(),
  //   replyNum: 0,
  // };
  theme.id = uuid.v4();
  theme.date = new Date();
  theme.upNum = 0;
  theme.scanNum = 0;
  theme.lastReply = new Date();
  theme.replyNum = 0;
  return theme;
}

module.exports.getAllThemes = getAllThemes;
// module.exports.loginCheck = loginCheck;
// module.exports.registerUser = registerUser;
module.exports.fetchPrivateThemes = fetchPrivateThemes;
module.exports.save = save;
module.exports.deleteTheme = deleteTheme;