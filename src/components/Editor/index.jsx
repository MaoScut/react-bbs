import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// 先实现更新
export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.saveType = this.saveType.bind(this);
    this.saveTitle = this.saveTitle.bind(this);
    this.saveContent = this.saveContent.bind(this);
    if (this.props.item) {
      this.state = {
        ...this.props.item,
      };
    } else {
      this.state = {
        title: '',
        content: '',
        type: '',
      };
    }
  }
  // componentDidMount() {
  //   this.props.actions.fetchExactArticle(this.props.match.params.articleId);
  // }
  saveTitle() {
    this.setState({
      title: this.titleInput.value,
    });
  }
  saveContent() {
    this.setState({
      content: this.contentInput.value,
    });
  }
  saveArticleType() {
    this.setState({
      type: this.typeInput.value,
    });
  }
  save() {
    this.props.onSave(this.state);
  }
  render() {
    return (
      <div>
        标题<input
          type="text"
          value={this.state.title}
          ref={(input) => {
            this.titleInput = input;
          }}
          onChange={this.saveTitle}
        />
        分类<input
          type="text"
          value={this.state.articleType}
          ref={(input) => {
            this.typeInput = input;
          }}
          onChange={this.savetype}
        />
        内容<input
          type="text"
          value={this.state.content}
          ref={(input) => {
            this.contentInput = input;
          }}
          onChange={this.saveContent}
        />
        <button onClick={this.save}>add/update</button>
        <button onClick={() => this.props.onCancel()}>cancel</button>
      </div>
    );
  }
}
Editor.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    title: PropTypes.string,
    ownerId: PropTypes.string,
    type: PropTypes.string,
    upNum: PropTypes.string,
    scanNum: PropTypes.string,
    lastReply: PropTypes.string,
    date: PropTypes.string,
    replyNum: PropTypes.string,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
// export default class MyEditor extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {editorState: EditorState.createEmpty()};
//     this.onChange = (editorState) => this.setState({editorState});
//   }
//   render() {
//     return <Editor editorState={this.state.editorState} onChange={this.onChange} />;
//   }
// }
// 纯函数组件是可以connect的
// function Editor ({ article }) {
//   const { title, articleType, content } = article;
//   return (
//     <div>
//       标题<input type="text" value={title} />
//       分类<input type="text" value={articleType} />
//       内容<input type="text" value={content} />
//     </div>
//   );
// }
