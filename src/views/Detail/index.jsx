import React from 'react';
import Floor from '../../components/Floor';
// import FirstFloor from '../../components/Floor';
import ReplyPop from '../../components/ReplyPop';
import '../../style/icon.scss';
import './main.scss';

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.upClick = this.upClick.bind(this);
  }
  componentDidMount() {
    this.props.actions.fetchCertainFollows(this.props.match.params.articleId);
  }
  handleClick() {
    this.props.actions.showReplyEditor(this.props.match.params.articleId);
  }
  upClick(e) {
    if (!e.target.className.includes('icon-aixin')) return false;
    // this.props.actions.upTopic(this.props.detail[0].id);
    this.props.actions.upFollow({
      followId: e.target.id,
      topicId: this.props.detail[0].id,
    });
    return false;
  }
  shareClick() {
    alert('none');
  }
  replyClick() {

  }
  render() {
    let content = 'loading';
    if (this.props.detail !== null) {
      content = this.props.detail.map(v => <Floor item={v} />);
    }
    return (
      <div className="wrap">
        <div className="detail" onClick={this.upClick} role="presentation">
          <div>
            {content}
          </div>
          <button onClick={this.handleClick}>回复</button>
          {this.props.editor.reply ?
            <ReplyPop
              topicId={this.props.match.params.articleId}
              onSubmit={this.props.actions.submitReply}
              onCancel={this.props.actions.cancelEdit}
            />
            : null}
        </div>
      </div>
    );
  }
}
