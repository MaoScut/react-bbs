import React from 'react';

export default class ReplyPop extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      content: '',
    };
  }
  onChange() {
    this.setState({
      content: this.input.value,
    });
  }
  submit() {
    this.props.onSubmit({
      content: this.state.content,
      topicId: this.props.topicId,
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
        <button onClick={this.submit}>提交</button>
        <button onClick={this.props.onCancel}>取消</button>
      </div>
    );
  }
}
