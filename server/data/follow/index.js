// 每个元素的格式
// themeId
// ownerId
// ownerName
// content
// id
// date
const path = require('path');
const uuid = require('uuid');
const { writeAll, readAll } = require('../utils');

const followPath = path.resolve(__dirname, 'follow.json');

function getAllFollows() {
  return readAll(followPath);
}
function writeAllFollows(arr) {
  return writeAll(arr, followPath);
}
function createFollowObj(follow) {
  follow.id = uuid.v4();
  follow.date = new Date();
  return follow;
}
function add(follow) {
  return getAllFollows()
    .then(data => JSON.parse(data))
    .then(res => writeAllFollows(res.concat(createFollowObj(follow))));
}
function getCertainFollows(id) {
  return getAllFollows()
    .then(data => JSON.parse(data))
    .then(res => res.filter(v => v.themeId === id))
    .then(arr => JSON.stringify(arr));
}
module.exports = {
  add,
  getCertainFollows,
};

