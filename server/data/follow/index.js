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
const topic = require('../topic');

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
  return topic.getAllTopics()
    .then(data => JSON.parse(data))
    .then(arr => arr.filter(v => v.id === id)[0])
    .then(topicObj => getAllFollows()
      .then(data => JSON.parse(data))
      .then(res => [topicObj, ...res.filter(v => v.topicId === id)])
      .then(arr => JSON.stringify(arr)));
  // return getAllFollows()
  //   .then(data => JSON.parse(data))
  //   .then(res => res.filter(v => v.topicId === id))
  //   .then(arr => JSON.stringify(arr));
}

function upFollow(followId, topicId) {
  return getAllFollows()
    .then(data => JSON.parse(data))
    .then((arr) => {
      const targetFollow = arr.find(v => v.id === followId);
      targetFollow.upNum = Number(targetFollow.upNum) + 1;
      return arr;
    })
    .then(arr => writeAllFollows(arr))
    .then(() => getCertainFollows(topicId));
}

module.exports = {
  add,
  getCertainFollows,
  upFollow,
};
