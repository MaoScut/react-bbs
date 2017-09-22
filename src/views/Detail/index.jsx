import React from 'react';
import Floor from '../../components/Floor';
import FirstFloor from '../../components/FirstFloor';
// import FirstFloor from '../../components/Floor';
import ReplyPop from '../../components/ReplyPop';
import Loading from '../../components/Loading';
import '../../style/icon.scss';
import './main.scss';

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.upClick = this.upClick.bind(this);
  }
  componentDidMount() {
    if (this.props.detail.topic) {
    // 有topic，说明是从主页过来的，只要content就好      
      this.props.actions.fetchTopicContent(this.props.match.params.articleId);
    } else {
      // 无topic，直接从地址栏过来，那么要获取整个topic
      this.props.actions.fetchTopic(this.props.match.params.articleId);
    }
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
    });
    return false;
  }
  render() {
    let topic = <Loading />;
    let follows = <Loading />;
    if (this.props.detail.topic !== null) {
      topic = <FirstFloor upAction={this.props.actions.upTopic} item={this.props.detail.topic} />;
    }
    if (this.props.detail.follows !== null) {
      follows = this.props.detail.follows.map(v => <Floor item={v} />);
    }
    return (
      <div className="wrap">
        <div className="detail" onClick={this.upClick} role="presentation">
          <div>
            {topic}
            {follows}
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
