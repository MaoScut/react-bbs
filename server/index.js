const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const config = require('../webpack.config.selfserver');
const path = require('path');
const Express = require('express');
// const FileStore = require('session-file-store')(session);
const history = require('connect-history-api-fallback');
// const RedisStore = require('connect-redis')(session);
const serveStatic = require('serve-static');
// const database = require('./data');
const account = require('./data/account');
const topicdb = require('./data/topic');
const follow = require('./data/follow');
const utils = require('./data/utils');
const requestHandler = require('./requestHandler');
// const sessionStore = require('./server/sessionStore').store;

const app = new Express();
const port = 8080;

const compiler = webpack(config);
// app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
// app.use(webpackHotMiddleware(compiler));

// webpack要放在前面才能得到bundle.js
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  // contentBase: './dist',
}));
app.use(webpackHotMiddleware(compiler));
app.use(serveStatic(path.resolve('./dist')));
app.use(cookieParser());
app.use(history({
  index: '/index.html',
  // disableDotRule: true,
  verbose: true,
  // rewrites: [{
  //   from: '/login',
  //   to: 'index.html',
  // }],
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(serveStatic(path.resolve('./dist')));

app.use(session({
  // store: new FileStore(),
  // store: new RedisStore(),
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 60000 },
}));

// get请求
app.get('/fetchAll', (req, res) => {
  requestHandler.fetchAll(req, res);
});
app.get('/fetchFollows', (req, res) => {
  requestHandler.fetchFollows(req, res);
});

// post请求
app.post('/login', (req, res) => {
  requestHandler.login(req, res);
});
app.post('/regist', (req, res) => {
  requestHandler.regist(req, res);
});
app.post('/save', (req, res) => {
  requestHandler.save(req, res);
});
app.post('/follow', (req, res) => {
  requestHandler.addFollow(req, res);
});
app.post('/upTopic', (req, res) => {
  requestHandler.upTopic(req, res);
});
app.post('/upFollow', (req, res) => {
  requestHandler.upFollow(req, res);
});
app.post('/fetchTopicContent', (req, res) => {
  requestHandler.fetchTopic(req, res);
});
app.post('/setUserHeadImg', (req, res) => {
  requestHandler.setUserHeadImg(req, res);
});

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});

