import React from 'react';
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
          <aside>
            {item.upNum}<i className="iconfont icon-aixin" id={item.id} onClick={this.upClick} role="presentation" />
            <i className="iconfont icon-lianjie" />
            <i className="iconfont icon-gengduo" />
            <span>reply</span>
          </aside>
        </section>
      </div>
    );
  }
}
