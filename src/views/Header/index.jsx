import React from 'react';
import { Link } from 'react-router-dom';

require('./main.scss');
require('../../style/icon.scss');
// require('./ionicons.css');

export default function ({ auth, actions }) {
  if (auth.auth) {
    return (
      <div className="header">
        <div className="wrap">
          <Link to="/"><img src="/images/logo.png" alt="logo" /></Link>
          <i className="iconfont icon-sousuo1" />
          <i className="iconfont icon-zhankai" />
          {/* <div><button onClick={() => actions.logoutUser()}>logout</button></div> */}
          {/* <div className="right"><button onClick={() => actions.myArticles()}>我的文章</button></div> */}
          <div><Link to="/private">{auth.name}</Link></div>
        </div>
      </div>
    );
  }
  return (
    <div className="header">
      <img src="/images/logo.png" alt="logo" />
      {/* <div className="search" /> */}
      <div className="right"><Link to="/">Home</Link></div>
      <div className="right"><button onClick={() => actions.toggleRegist()}>regist</button></div>
      <div className="right"><button onClick={() => actions.toggleLogin()}>login</button></div>
      {/* <div><button>search</button></div>
      <div><button>more</button></div> */}
    </div>
  );
}
