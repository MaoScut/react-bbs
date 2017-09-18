import React from 'react';
import PropTypes from 'prop-types';
// import './main.scss';
import { timeDistance } from '../../utils';

// export default function FirstFloor({ item, upAction }) {
//   function upClick() {
//     this.props.upAction(item.id);
//   }
//   return (
//     <div className="floor">
//       <h2>{item.title}</h2>
//       <section>
//         <img className="user-head-img" src="/images/90.png" alt="" />
//         <div>
//           <p>用户名<span>{timeDistance(item.date)}</span></p>
//           <p>{item.content}</p>
//         </div>
//         <aside>
//           {item.upNum}<i className="iconfont icon-aixin" id={item.id} />
//           <i className="iconfont icon-lianjie" />
//           <i className="iconfont icon-gengduo" />
//           <span>reply</span>
//         </aside>
//       </section>
//     </div>
//   );
// }

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
    return (
      <div className="floor">
        <h2>{item.title}</h2>
        <section>
          <img className="user-head-img" src="/images/90.png" alt="" />
          <div>
            <p>用户名<span>{timeDistance(item.date)}</span></p>
            <p>{item.content}</p>
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
    upNum: PropTypes.string,
  }).isRequired,
};
