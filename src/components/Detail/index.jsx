import React from 'react';
import Floor from '../Floor';

export default class Detail extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.handleClick = this.handleClick.bind(this);
  // }
  componentDidMount() {
    this.props.actions.fetchCertainFollows (this.props.match.params.articleId);
  }
  // handleClick() {
  //   this.props.history.push(`/Editor/${this.props.match.params.articleId}`);
  // }
  render() {
    let content = 'loading';
    if (this.props.detail !== null) content = this.props.detail.map(v => <Floor floor={v} />);
    return (
      <div className="detail">
        {content}
        {/* <button onClick={this.handleClick}>跳转</button> */}
      </div>
    );
  }
}
