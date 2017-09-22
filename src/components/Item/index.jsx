import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { timeDistance } from '../../utils';

const color = {
  分享: 'purple',
  教程: 'blue',
  提问: 'green',
  招聘: 'grey',
  作品: 'red',
};

export default function Item({ item }) {
  const borderColor = color[item.type];
  const styleObj = {
    borderLeft: `5px solid ${borderColor}`,
    paddingLeft: '4px',
  };
  return (
    <tr>
      {/* <td><Link to={`/detail/${item.id}`}>{item.title}</Link></td> */}
      <td><a href={`/detail/${item.id}`} id={item.id}>{item.title}</a></td>
      {/* <td>{item.title}</td> */}
      <td><span style={styleObj}>{item.type}</span></td>
      <td><span>{item.replyNum}</span></td>
      <td><span>{item.scanNum}</span></td>
      <td><span>{timeDistance(item.lastReply)}</span></td>
    </tr>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    upNum: PropTypes.string,
    scanNum: PropTypes.string,
    lastReply: PropTypes.string,
    replyNum: PropTypes.string,
  }).isRequired,
};

