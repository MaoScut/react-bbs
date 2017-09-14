import React from 'react';
import { Router, Route } from 'react-router-dom';
import Detail from '../components/Detail';
import Editor from '../components/Editor';
import { Home, Header, Error, PrivateArticles, Login } from '../components/Connected';
import RequireAuth from '../components/RequireAuth';
import history from '../history';

export default () => (
  <Router history={history}>
    <div>
      <Route path="/" component={Header} />
      <Route path="/" component={Error} />
      <Route exact path="/" component={Home} />
      <Route exact path="/index.html" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route path="/detail/:articleId" component={Detail} />
      <Route path="/editor/:articleId" component={Editor} />
      <Route exact path="/private" component={RequireAuth(PrivateArticles)} />
    </div>
  </Router>
);
