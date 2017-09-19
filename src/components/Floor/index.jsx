import React from 'react';
import PropTypes from 'prop-types';
import './main.scss';
import { timeDistance } from '../../utils';

export default function Floor({ item }) {
  const imgSrc = item.imgHead ? `/images/userHead/${item.ownerId}.jpg` : `/images/userHead/${item.userName[0].toUpperCase()}.png`;
  return (
    <div className="floor">
      <h2>{item.title}</h2>
      <section>
        <img className="user-head-img" src={imgSrc} alt="" />
        <div>
          <p>{item.userName}<span>{timeDistance(item.date)}</span></p>
          <p>{item.content}</p>
        </div>
        <aside>
          {item.upNum}<i className="iconfont icon-aixin" id={item.id} />
          <i className="iconfont icon-lianjie" />
          <i className="iconfont icon-gengduo" />
          <span>reply</span>
        </aside>
      </section>
    </div>
  );
}
Floor.propTypes = {
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
