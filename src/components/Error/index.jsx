import React from 'react';
import PropTypes from 'prop-types';

export default function Error({ error }) {
  return (
    <div>
      {error}
    </div>
  );
}
Error.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }).isRequired,
};
// export default class Error extends React.Component {
//   render() {
//     return (
//       <div>
//         {this.props.error}
//       </div>
//     )
//   }
// }
