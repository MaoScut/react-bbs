import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../action/async';
// export default function () {
//   return (
//     <div>
//       detail!!!!???
//     </div>
//   );
// }
class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.actions.fetchExactArticle(this.props.match.params.articleId);
  }
  handleClick() {
    this.props.history.push(`/Editor/${this.props.match.params.articleId}`);
  }
  render() {
    let content = 'loading';
    if (this.props.article !== null) content = this.props.article.content;
    return (
      <div>
        {content}
        {/* <button onClick={this.handleClick}>跳转</button> */}
      </div>
    );
  }
}
export default connect(
  state => ({
    article: state.article,
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
  }),
)(Detail);
