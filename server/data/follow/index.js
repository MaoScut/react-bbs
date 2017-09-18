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
    .then((res) => {
      topic.getAllTopics().then(data => JSON.parse(data)).then((arr) => {
        const target = arr.find(v => v.id === follow.topicId);
        target.replyNum = Number(target.replyNum) + 1;
        return topic.writeAllTopics(arr);
      });
      return writeAllFollows(res.concat(createFollowObj(follow)));
    });
}
function getCertainFollows(id) {
  return getAllFollows()
    .then(data => JSON.parse(data))
    .then(res => res.filter(v => v.topicId === id))
    .then(arr => JSON.stringify(arr));
  // return getAllFollows()
  //   .then(data => JSON.parse(data))
  //   .then(res => res.filter(v => v.topicId === id))
  //   .then(arr => JSON.stringify(arr));
}

function upFollow(followId) {
  return getAllFollows()
    .then(data => JSON.parse(data))
    .then((arr) => {
      const targetFollow = arr.find(v => v.id === followId);
      targetFollow.upNum = Number(targetFollow.upNum) + 1;
      writeAllFollows(arr);
      // 这里就藏着目标主题了啊，不用再传topicId了
      return arr.filter(v => v.topicId === targetFollow.topicId);
    })
    .then(follows => JSON.stringify(follows));
}

module.exports = {
  add,
  getCertainFollows,
  upFollow,
};
