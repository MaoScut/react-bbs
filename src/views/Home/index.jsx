import React from 'react';
import { Link } from 'react-router-dom';
import List from '../../components/List';
import { LoginPop, RegistPop } from '../../components/Pop';
import Editor from '../../components/Editor';
import './main.scss';

export default class Home extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.add = this.add.bind(this);
  // }
  componentDidMount() {
    this.props.actions.fetchArticles();
  }
  render() {
    return (
      <div>
        <div className="wrap">
          <div className="create-button-container">
            <button onClick={this.props.actions.showEditor}>+ 发新主题</button>
          </div>
          <List items={this.props.topics} />
          {this.props.auth.login ?
            <LoginPop
              onSubmit={this.props.actions.loginUser}
              onCancel={this.props.actions.toggleLogin}
            />
            : null}
          {this.props.auth.regist ?
            <RegistPop
              onSubmit={this.props.actions.registerUser}
              onCancel={this.props.actions.toggleRegist}
            />
            : null}
          {this.props.editor.create ?
            <Editor
              article={this.props.editor.topic}
              onSave={this.props.actions.saveTopic}
              onCancel={this.props.actions.cancelEdit}
            />
            : null}
        </div>
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
