import React from 'react';

export default function ({ error }) {
  return (
    <div>
      {error}
    </div>
  );
}
// export default class Error extends React.Component {
//   render() {
//     return (
//       <div>
//         {this.props.error}
//       </div>
//     )
//   }
// }
