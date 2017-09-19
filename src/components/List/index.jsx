import React from 'react';
import PropTypes from 'prop-types';
import Item from '../Item';

export default function List({ items, onDelete }) {
  if (!items) {
    return (
      <div>
        loading...
      </div>
    );
  }
  function catchBubble(e) {
    if (e.target.className === 'delete-btn') {
      if (onDelete) onDelete(e.target.value);
    }
  }
  const list = items.map(topic => <Item key={topic.id} item={topic} />);
  return (
    <table onClick={catchBubble} role="presentation">
      <tr>
        <td>主题</td>
        <td>分类</td>
        <td>回复</td>
        <td>浏览</td>
        <td>活动</td>
      </tr>
      {list}
    </table>
  );
}
// export function ListFactory(child) {
//   return function list(props) {
//     if (!props.articles) {
//       return (
//         <div>
//           loading...
//         </div>
//       );
//     }
//     function catchBubble(e) {
//       if (e.target.className === 'delete-btn') {
//         if (props.onDelete) props.onDelete(e.target.value);
//       }
//     }
//     const list = props.articles.map(article => child({ item: article }));
//     return (
//       <ul onClick={catchBubble} role="presentation">
//         {list}
//       </ul>
//     );
//   };
// }

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    upNum: PropTypes.string,
    scanNum: PropTypes.string,
    lastReply: PropTypes.string,
    replyNum: PropTypes.string,
    userName: PropTypes.string,
  })).isRequired,
  onDelete: PropTypes.func.isRequired,
};

