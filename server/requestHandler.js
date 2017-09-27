const account = require('./data/account');
const topicdb = require('./data/topic');
const follow = require('./data/follow');
const utils = require('./data/utils');

// 检查是否有匹配的账户密码
// 返回一个obj，若有错误，则返回的obj有err属性
// err{
//   message, type,
// }
function login(req, res) {
  account.loginCheck(req.body.email, req.body.password).then((result) => {
    const acc = result.acc;
    if (result.err) {
      res.end(JSON.stringify(result));
    } else {
      res.setHeader('Set-Cookie', [`userId=${acc.id};httpOnly`, `userName=${acc.userName}`]);
      // acc就剩下userName了
      result.acc = utils.cutObj(acc, ['userName']);
      res.end(JSON.stringify(result));
    }
  })
    .catch((err) => {
      // if (err.isClientErr) {
      //   res.status(401);
      //   res.end(JSON.stringify(err));
      // } else {
      //   console.log(err);
      //   res.status(500);
      //   res.end();
      // }
      console.log(err);
      res.status(500);
      res.end();
    });
}

function fetchAll(req, res) {
  // 获取主题帖子信息（不包括内容），必须返回json数组，元素有如下信息
  // id
  // lastReply
  // replyNum
  // scanNum
  // title
  // type
  // upNum
  // userId
  topicdb.fetchTopicsForHome().then(data => res.end(data));
}
function fetchFollows(req, res) {
  // 获取某篇主题帖的跟帖，json数组，每个元素有如属性  
  // content
  // date
  // id
  // topicId
  // upNum
  // userId
  // userName
  const id = req.query.id;
  follow.getCertainFollows(id).then(data => res.end(data));
}

function regist(req, res) {
  // 新用户注册
  // 必须传入一个obj，含有用户名，密码，邮箱
  // 暂时没返回数据，到时候应该要改
  account.registerUser(req.body).then((result) => {
    if (result.err) {
      res.end(JSON.stringify(result));
    } else {
      const acc = result.acc;
      res.setHeader('Set-Cookie', [`userId=${acc.id}; httpOnly`, `userName=${acc.userName}`]);
      res.end(JSON.stringify(result));
    }
  });
}

function save(req, res) {
  // 保存一个主题，更新还是新增在模块内判断
  req.body.userId = req.cookies.userId;
  topicdb.save(req.body).then(() => res.end());
}

function addFollow(req, res) {
  // 增加一条回帖
  // 回帖的属性如下
  // 
  const followObj = req.body;
  followObj.userId = req.cookies.userId;
  follow.add(followObj).then(() => res.end());
}

function upTopic(req, res) {
  // 点赞主题帖
  // 现在一个用户是可以无限点赞该帖子的，以后要改
  topicdb.upTopic(req.body.id).then(data => res.end(data));
}

function upFollow(req, res) {
  // 点赞跟帖
  // 现在一个用户是可以无限点赞该帖子的，以后要改  
  follow.upFollow(req.body.followId).then(data => res.end(data));
}

function fetchTopic(req, res) {
  // 获取一个主题帖的所有信息，home中只是简略信息
  // 返回的json数据要有如下属性
  topicdb.getCertainTopic(req.query.id).then(data => res.end(data));
}
function fetchTopicContent(req, res) {
  topicdb.getCertainTopicContent(req.query.id).then(data => res.end(data));
}

function setUserHeadImg(req, res) {
  // 上传用户头像
  // 最终返回该头像
  const id = req.cookies.userId;
  account.setImg(id, req.body.imgUri).then(data => res.end(data));
}

function logout(req, res) {
  const pass = new Date(Date.now() - 1);
  res.cookie('userName', null, {
    expires: pass,
  });
  res.cookie('userId', null, {
    expires: pass,
  });
  res.end();
}
module.exports = {
  login,
  logout,
  fetchAll,
  fetchFollows,
  regist,
  save,
  addFollow,
  upTopic,
  upFollow,
  fetchTopic,
  setUserHeadImg,
  fetchTopicContent,
};
