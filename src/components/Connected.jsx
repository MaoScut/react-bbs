// import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../action/async';
import Home from './Home';
import Header from './Header';
import { LoginPop } from './Pop';
import Regist from './Regist';
import Error from './Error';
import PrivateArticles from './PrivateArticles';

function mapDispatchToProps(dispatch) {
  return ({
    actions: bindActionCreators(actions, dispatch),
  });
}

const CHome = connect(
  state => state,
  mapDispatchToProps,
)(Home);

const CHeader = connect(
  state => state,
  mapDispatchToProps,
)(Header);

const CLogin = connect(
  state => state,
  dispatch => ({
    onSubmit: bindActionCreators(actions.loginUser, dispatch),
    onCancel: bindActionCreators(actions.toggleLogin, dispatch),
  }),
)(LoginPop);

const CRegist = connect(
  state => state,
  mapDispatchToProps,
)(Regist);

const CError = connect(
  state => state,
  mapDispatchToProps,
)(Error);

const CPrivateArticles = connect(
  state => state,
  mapDispatchToProps,
)(PrivateArticles);
export {
  CHeader as Header,
  CHome as Home,
  CLogin as Login,
  CRegist as Regist,
  CError as Error,
  CPrivateArticles as PrivateArticles,
};

