import React from 'react';
import { Link } from 'react-router-dom';

const color = {
  '分享': 'purple',
  '教程': 'blue',
  '提问': 'green',
  '招聘': 'grey',
  '作品': 'red',
};

export default function Item({ item }) {
  const borderColor = color[item.articleType];
  const styleObj = {
    borderLeft: `5px solid ${borderColor}`,
    paddingLeft: '4px',
  };
  return (
    <tr>
      <td><Link to={`/detail/${item.articleId}`}>{item.title}</Link></td>
      {/* <td>{item.title}</td> */}
      <td><span style={styleObj}>{item.articleType}</span></td>
      <td><span>{item.replyNum}</span></td>
      <td><span>{item.scanNum}</span></td>
      <td><span>{item.lastReply}</span></td>
    </tr>
  );
}
