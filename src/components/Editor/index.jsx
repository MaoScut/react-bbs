import React from 'react';
import PropTypes from 'prop-types';

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
        titleErr: '',
        content: '',
        contentErr: '',
        type: '分享',
      };
    }
  }
  saveTitle() {
    this.setState({
      title: this.titleInput.value,
      // titleErr: null,
    });
  }
  saveContent() {
    this.setState({
      content: this.contentInput.value,
      // contentErr: null,
    });
  }
  saveType() {
    this.setState({
      type: this.typeInput.value,
    });
  }
  save() {
    if (this.state.title !== '' && this.state.content !== '') {
      this.props.onSave({
        title: this.state.title,
        content: this.state.content,
        type: this.state.type,
      });
    } else {
      // 既然现在输入是没有限定的，那么就提交的时候一起判断好了
      const titleErr = this.state.title === '' ? '请输入标题' : null;
      const contentErr = this.state.content === '' ? '请输入内容' : null;
      this.setState({
        titleErr,
        contentErr,
      });
    }
  }
  render() {
    return (
      <div className="editor">
        标题:<input
          type="text"
          value={this.state.title}
          ref={(input) => {
            this.titleInput = input;
          }}
          onChange={this.saveTitle}
        />
        <span>{this.state.titleErr}</span>
        <br />
        分类:<select
          type="text"
          value={this.state.type}
          ref={(input) => {
            this.typeInput = input;
          }}
          onChange={this.saveType}
        >
          <option value="分享" selected>分享</option>
          <option value="教程">教程</option>
          <option value="提问">提问</option>
          <option value="招聘">招聘</option>
          <option value="作品">作品</option>
        </select>
        <br />
        内容:
        <br />
        <textarea
          className="textarea"
          rows="10"
          value={this.state.content}
          ref={(input) => {
            this.contentInput = input;
          }}
          onChange={this.saveContent}
        />
        <span>{this.state.contentErr}</span>
        <br />
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
