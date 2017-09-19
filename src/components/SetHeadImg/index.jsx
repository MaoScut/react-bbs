import React from 'react';

// export default function HeadImg({onSubmit, onCancel}) {
//   return (
//     <form action="/setUserHeadImg" method="post" encType="multipart/form-data">
//       <input type="file" name="img" />
//       <input type="submit" />
//     </form>
//   );
// }
export default class SetUserHeadImg extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileReader = new FileReader();
    this.state = {
      inputValue: null,
    };
  }
  onClick() {
    this.props.onSubmit(this.state.inputValue);
  }
  onChange() {
    this.fileReader.readAsDataURL(this.input.files[0]);
    this.fileReader.onloadend = (function () {
      this.setState({
        inputValue: this.fileReader.result,
      });
    }).bind(this);
  }
  render() {
    return (
      <div>
        <input type="file" name="" id="" ref={input => this.input = input} onChange={this.onChange} />
        <button onClick={this.onClick}>提交</button>
      </div>
    );
  }
}