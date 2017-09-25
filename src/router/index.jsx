import React from 'react';
import { Router, Route } from 'react-router-dom';
import { Home, Detail, Header, Private, Error, Pop } from '../views/Connected';
import history from '../history';
import '../style/icon.scss';
import '../style/main.scss';

export default () => (
  <Router history={history}>
    <div>
      <Route path="/" component={Header} />
      <Route path="/" component={Pop} />
      {/* <Route path="/" component={Error} /> */}
      <Route exact path="/" component={Home} />
      <Route exact path="/index.html" component={Home} />
      {/* <Route exact path="/login" component={Login} /> */}
      <Route path="/detail/:articleId" component={Detail} />
      <Route path="/private" component={Private} />
      <Route path="/" component={Error} />
      {/* <Route path="/editor/:articleId" component={Editor} /> */}
      {/* <Route exact path="/private" component={RequireAuth(PrivateArticles)} /> */}
    </div>
  </Router>
);
