const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const bodyParser = require('body-parser');
// const session = require('express-session');
const cookieParser = require('cookie-parser');
const config = require('../webpack.config.selfserver');
const path = require('path');
const Express = require('express');
// const FileStore = require('session-file-store')(session);
const history = require('connect-history-api-fallback');
// const RedisStore = require('connect-redis')(session);
const serveStatic = require('serve-static');
const requestHandler = require('./requestHandler');
// const sessionStore = require('./server/sessionStore').store;

const app = new Express();
const port = 8080;

const compiler = webpack(config);
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

// app.use(session({
//   // store: new FileStore(),
//   // store: new RedisStore(),
//   secret: 'keyboard cat',
//   resave: true,
//   saveUninitialized: false,
//   cookie: { maxAge: 60000 },
// }));
app.use((req, res, next) => {
  if (req.method === 'POST' && req.url !== '/login') {
    if (!req.cookies.userId) {
      res.end(JSON.stringify({
        err: {
          type: 'NEED_AUTH',
          message: '请先登录！',
        },
      }));
    } else next();
  } else {
    next();
  }
});

// get请求
app.get('/fetchAll', (req, res) => {
  requestHandler.fetchAll(req, res);
});
app.get('/fetchFollows', (req, res) => {
  requestHandler.fetchFollows(req, res);
});
app.get('/fetchTopic', (req, res) => {
  requestHandler.fetchTopic(req, res);
});
app.get('/fetchTopicContent', (req, res) => {
  requestHandler.fetchTopicContent(req, res);
});

// post请求
app.post('/login',
  requestHandler.login);
app.post('/regist',
  requestHandler.regist);
app.post('/save',
  requestHandler.save);
app.post('/follow',
  requestHandler.addFollow);
app.post('/upTopic',
  requestHandler.upTopic);
app.post('/upFollow',
  requestHandler.upFollow);
app.post('/setUserHeadImg',
  requestHandler.setUserHeadImg);
app.post('/logout',
  requestHandler.logout);

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});

