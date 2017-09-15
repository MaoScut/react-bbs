import React from 'react';
import Floor from '../Floor';
// import Editor from '../Editor';
import ReplyPop from '../ReplyPop';

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.actions.fetchCertainFollows(this.props.match.params.articleId);
  }
  handleClick() {
    this.props.actions.showReplyEditor(this.props.match.params.articleId);
  }
  render() {
    let content = 'loading';
    if (this.props.detail !== null) content = this.props.detail.map(v => <Floor floor={v} />);
    return (
      <div className="detail">
        <div>
          {content}
        </div>
        <button onClick={this.handleClick}>回复</button>
        {this.props.editor.reply ?
          <ReplyPop onSubmit={this.props.actions.saveReply} onCancel={this.props.actions.cancelEdit} /> :
          null}
      </div>
    );
  }
}
