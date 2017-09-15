import React from 'react';

export default class ReplyPop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }
  onChange() {
    this.setState({
      content: this.input.vaule,
    });
  }
  render() {
    return (
      <div>
        <input
          ref={(input) => {
            this.input = input;
          }}
          onChange={this.onChange}
          type="text"
        />
        <button onClick={this.props.onSubmit}>提交</button>
        <button onClick={this.props.onCancel}>取消</button>
      </div>
    );
  }
}
