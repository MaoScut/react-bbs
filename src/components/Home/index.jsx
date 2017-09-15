import React from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import List from '../List';
import { LoginPop, RegistPop } from '../Pop';
import Editor from '../Editor';
// import * as actions from '../../action/async';
import './main.scss';

export default class Home extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.add = this.add.bind(this);
  // }
  componentDidMount() {
    this.props.actions.fetchArticles();
  }
  // add() {
  //   this.props.actions.add({
  //     title: 'aa',
  //     content: 'bb',
  //     articleType: 'cc',
  //   });
  // }
  render() {
    return (
      <div>
        <button onClick={this.props.actions.showEditor}>+ 发新主题</button>    
        <List articles={this.props.topics} />
        {this.props.auth.login ? <LoginPop onSubmit={this.props.actions.loginUser} onCancel={this.props.actions.toggleLogin} /> : null}
        {this.props.auth.regist ? <RegistPop onSubmit={this.props.actions.registerUser} onCancel={this.props.actions.toggleRegist} /> : null}
        {this.props.editor.create ? <Editor article={this.props.editor.topic} onSave={this.props.actions.saveTopic} onCancel={this.props.actions.cancelEdit} /> : null}
      </div>
    );
  }
}
//  connect(
//   state => ({
//     articles: state.articles,
//   }),
//   dispatch => ({
//     actions: bindActionCreators(actions, dispatch),
//   }),
// )(Home);
