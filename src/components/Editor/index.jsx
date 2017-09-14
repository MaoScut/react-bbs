import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// 先实现更新
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.saveArticleType = this.saveArticleType.bind(this);
    this.saveTitle = this.saveTitle.bind(this);
    this.saveContent = this.saveContent.bind(this);
    if (this.props.article) {
      this.state = {
        ...this.props.article,
      };
    } else {
      this.state = {
        title: '',
        content: '',
        articleType: '',
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
      articleType: this.articleTypeInput.value,
    });
  }
  save() {
    this.props.onSave(this.state);
  }
  render() {
    return (
      <div>
        标题<input type="text" value={this.state.title} ref={input => this.titleInput = input} onChange={this.saveTitle} />
        分类<input type="text" value={this.state.articleType} ref={input => this.articleTypeInput = input} onChange={this.saveArticleType} />
        内容<input type="text" value={this.state.content} ref={input => this.contentInput = input} onChange={this.saveContent} />
        <button onClick={this.save}>add/update</button>
        <button onClick={() => this.props.onCancel()}>cancel</button>
      </div>
    );
  }
}
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
