import React from 'react';
import { Link } from 'react-router-dom';

require('./main.scss');

export default function ({ auth, actions }) {
  const rightContent = auth.auth ?
    (<div className="panel clearfix">
      <i className="iconfont icon-sousuo1" />
      <i className="iconfont icon-zhankai" />
      <div><Link to="/private">{auth.name}</Link></div>
      <div><button onClick={() => actions.logoutUser()}>注销</button></div>
    </div>)
    : (<div className="panel clearfix">
      <i className="iconfont icon-sousuo1" />
      <i className="iconfont icon-zhankai" />
      {/* <div className="search" /> */}
      {/* <div className="right"><Link to="/">Home</Link></div> */}
      <div><button onClick={() => actions.popRegist()}>注册</button></div>
      <div><button onClick={() => actions.popLogin()}>登录</button></div>
      {/* <div><button>search</button></div>
      <div><button>more</button></div> */}
    </div>);
  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/"><img src="/images/logo.png" alt="logo" /></Link>
      </div>
      {rightContent}
    </header>
  );
}
