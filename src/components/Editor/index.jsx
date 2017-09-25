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
        content: '',
        type: '分享',
      };
    }
  }
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
  saveType() {
    this.setState({
      type: this.typeInput.value,
    });
  }
  save() {
    this.props.onSave(this.state);
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
