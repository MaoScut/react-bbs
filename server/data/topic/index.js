// const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const { writeAll, readAll } = require('../utils');
const account = require('../account');

const topicPath = path.join(__dirname, 'topic.json');
// const accountPath = path.join(__dirname, 'account.json');

function getAllTopics() {
  return readAll(topicPath);
}

function writeAllTopics(arr) {
  return writeAll(arr, topicPath);
}

function fetchPrivateTopics(id) {
  return getAllTopics()
    .then(data => JSON.parse(data))
    .then(result => result.filter(v => v.ownerId === id))
    .then(result => JSON.stringify(result || []));
}

function createTopic(topic) {
  topic.id = uuid.v4();
  topic.date = new Date();
  topic.upNum = 0;
  topic.scanNum = 0;
  topic.lastReply = new Date();
  topic.replyNum = 0;
  return topic;
}

function add(topic) {
  // article.articleId = uuid.v4();
  // article.ownerId = ownerId;
  return getAllTopics()
    .then(data => JSON.parse(data))
    .then(result => writeAllTopics(result.concat(createTopic(topic))));
}
function updateTopic(topic) {
  return getAllTopics()
    .then(data => JSON.parse(data))
    .then((topics) => {
      const index = topics.findIndex(v => v.id === topic.id);
      const newTopics = topics.slice();
      newTopics[index] = topic;
      return writeAllTopics(newTopics);
    });
}

function save(theme) {
  if (theme.id) {
    // 有id，是更新
    return updateTopic(theme);
  }
  // 无id，是新建
  return add(theme);
}

function deleteTopic(id) {
  return getAllTopics()
    .then(data => JSON.parse(data))
    .then(topics => writeAllTopics(topics.filter(topic => topic.id !== id)));
}
// 连接topic和account，返回topic
function linkAccount() {
  return getAllTopics().then(data => JSON.parse(data))
    .then((topics) => {
      return account.getAllAccounts().then(data => JSON.parse(data))
        .then((accounts) => {
          topics.forEach((topic) => {
            topic.userName = accounts.find(acc => acc.id === topic.userId).userName;
          });
          return topics;
        });
    });
}

function upTopic(id) {
  return getAllTopics()
    .then(data => JSON.parse(data))
    .then((arr) => {
      const targetTopic = arr.find(v => v.id === id);
      targetTopic.upNum = Number(targetTopic.upNum) + 1;
      // 之后请加上错误处理！
      return writeAllTopics(arr)
        .then(() => linkAccount().then(topics => topics.find(topic => topic.id === id)));
      // return targetTopic;
    })
    .then(topic => JSON.stringify(topic));
}

// function getCertainTopic(id) {
//   return getAllTopics()
//     .then(data => JSON.parse(data))
//     .then((arr) => {
//       const target = arr.find(v => v.id === id);
//       target.scanNum = Number(target.scanNum) + 1;
//       writeAllTopics(arr);
//       return target;
//     })
//     .then(topic => JSON.stringify(topic));
// }

// function fetchTopicsForHome() {
//   return getAllTopics().then(data => JSON.parse(data))
//     .then((arr) => {
//       arr.forEach((topic) => {
//         delete topic.content;
//         delete topic.ownerId;
//         delete topic.date;
//       });
//       return arr;
//     })
//     .then(arr => JSON.stringify(arr));
// }

function getCertainTopic(id) {
  return getAllTopics()
    .then(data => JSON.parse(data))
    .then((arr) => {
      const target = arr.find(v => v.id === id);
      target.scanNum = Number(target.scanNum) + 1;
      writeAllTopics(arr);
      return account.getAllAccounts()
        .then(data => JSON.parse(data))
        .then((accounts) => {
          // arr.forEach((v) => {
          const ac = accounts.find(acc => acc.id === target.userId);
          target.userName = ac.userName;
          target.headImg = ac.headImg;
          // });
          return target;
        });
      // return target;
    })
    .then(topic => JSON.stringify(topic));
}

function getCertainTopicContent(id) {
  return getAllTopics().then(data => JSON.parse(data))
    .then(topics => topics.find(t => t.id === id))
    .then(topic => topic.content)
    .then(content => JSON.stringify({
      content,
    }));
}

// 连接topic和account，返回topic
function linkAccount() {
  return getAllTopics().then(data => JSON.parse(data))
    .then((topics) => {
      return account.getAllAccounts().then(data => JSON.parse(data))
        .then((accounts) => {
          topics.forEach((topic) => {
            const targetAcc = accounts.find(acc => acc.id === topic.userId);
            topic.userName = targetAcc.userName;
            topic.headImg = targetAcc.headImg;
          });
          return topics;
        });
    });
}

function fetchTopicsForHome() {
  return getAllTopics().then(data => JSON.parse(data))
    .then(arr => account.getAllAccounts()
      .then(data => JSON.parse(data))
      .then((accounts) => {
        arr.forEach((topic) => {
          const acc = accounts.find(v => v.id === topic.userId);
          topic.userName = acc.userName;
          topic.headImg = acc.headImg;
          delete topic.content;
          delete topic.ownerId;
          // delete topic.date;
        });
        return arr;
      }))
    .then(arr => JSON.stringify(arr));
}

module.exports = {
  getAllTopics,
  fetchPrivateTopics,
  save,
  deleteTopic,
  upTopic,
  getCertainTopic,
  writeAllTopics,
  fetchTopicsForHome,
  getCertainTopicContent,
};
