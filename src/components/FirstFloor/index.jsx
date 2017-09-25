import React from 'react';
import PropTypes from 'prop-types';
import { timeDistance } from '../../utils';
import Loading from '../Loading';

export default class FirstFloor extends React.Component {
  constructor(props) {
    super(props);
    this.upClick = this.upClick.bind(this);
  }
  upClick(e) {
    e.stopPropagation();
    this.props.upAction(this.props.item.id);
  }
  render() {
    const item = this.props.item;
    const imgSrc = item.headImg;
    return (
      <div className="floor">
        <h2>{item.title}</h2>
        <section>
          <img className="user-head-img" src={imgSrc} alt="" />
          <div>
            <p>{item.userName}<span>{timeDistance(item.date)}</span></p>
            {item.content ? (<p>{item.content}</p>) : (<Loading />)}
          </div>
          <aside className="clearfix">
            {item.upNum}
            <i
              className="iconfont icon-aixin"
              id={item.id}
              onClick={this.upClick}
              role="presentation"
            />
            <i className="iconfont icon-lianjie" />
            <i className="iconfont icon-gengduo" />
            <span>reply</span>
          </aside>
          {/* 帖子详情 */}
          <aside className="topic-detail">
            <li>创建时间<br />{timeDistance(item.date)}</li>
            <li>最后回复<br />{timeDistance(item.lastReply)}</li>
            <li>回复<br />{item.replyNum}</li>
            <li>浏览<br />{item.scanNum}</li>
            {/* <li>用户<br />{item.date}</li> */}
            <li>赞<br />{item.upNum}</li>
            {/* <li>链接<br />{item.date}</li> */}
            {/* <li>参与者<br />{item.date}</li> */}
          </aside>
        </section>
      </div>
    );
  }
}
FirstFloor.propTypes = {
  upAction: PropTypes.func.isRequired,
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
};
