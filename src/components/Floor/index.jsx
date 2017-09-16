import React from 'react';
import './main.scss';
import { timeDistance } from '../../utils';

export default function Floor({ item }) {
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
          <i className="iconfont icon-aixin" />
          <i className="iconfont icon-lianjie" />
          <i className="iconfont icon-gengduo" />
          <span>reply</span>
        </aside>
      </section>
    </div>
  );
}
