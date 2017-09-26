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
const account = require('../account');

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
  follow.upNum = 0;
  return follow;
}
function add(follow) {
  return getAllFollows()
    .then(data => JSON.parse(data))
    .then((res) => {
      topic.getAllTopics().then(data => JSON.parse(data)).then((arr) => {
        const target = arr.find(v => v.id === follow.topicId);
        target.replyNum = Number(target.replyNum) + 1;
        target.lastReply = new Date();
        return topic.writeAllTopics(arr);
      });
      return writeAllFollows(res.concat(createFollowObj(follow)));
    });
}
function linkAccount(id) {
  return getAllFollows()
    .then(data => JSON.parse(data))
    .then(res => res.filter(v => v.topicId === id))
    .then(follows => account.getAllAccounts()
      .then(data => JSON.parse(data))
      .then((accounts) => {
        follows.forEach((v) => {
          // const test = accounts.find(acc => acc.id = v.userId);
          const tmp = accounts.find(acc => acc.id === v.userId);
          v.headImg = tmp.headImg;
          v.userName = tmp.userName;
        });
        return follows;
      }));
}

function getCertainFollows(id) {
  // return getAllFollows()
  //   .then(data => JSON.parse(data))
  //   .then(res => res.filter(v => v.topicId === id))
  //   .then(arr => JSON.stringify(arr));
  return linkAccount(id)
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
      return writeAllFollows(arr).then(() => linkAccount(targetFollow.topicId));
      // 这里就藏着目标主题了啊，不用再传topicId了
      // return linkAccount(targetFollow.topicId);
      // return arr.filter(v => v.topicId === targetFollow.topicId);
    })
    .then(follows => JSON.stringify(follows));
}


module.exports = {
  add,
  getCertainFollows,
  upFollow,
};
