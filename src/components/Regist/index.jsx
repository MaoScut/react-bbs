import React from 'react';
import PropTypes from 'prop-types';

export default class Regist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      userName: '',
      err: this.props.err ? this.props.err.message : null,
    };
    this.saveEmail = this.saveEmail.bind(this);
    this.savePassword = this.savePassword.bind(this);
    this.saveUserName = this.saveUserName.bind(this);
    this.checkAndSubmit = this.checkAndSubmit.bind(this);
    this.ready = {
      name: false,
      email: false,
      password: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      err: nextProps.err ? nextProps.err.message : null,
    });
  }
  saveEmail() {
    const reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
    if (reg.test(this.emailInput.value)) {
      this.ready.email = true;
      this.setState({
        email: this.emailInput.value,
        err: null,
      });
    } else {
      this.ready.email = false;
      this.setState({
        email: this.emailInput.value,
        err: '邮箱格式错误！',
      });
    }
  }
  savePassword() {
    if (this.passwordInput.value !== '') {
      this.ready.password = true;
      this.setState({
        password: this.passwordInput.value,
        err: null,
      });
    } else {
      this.ready.password = false;
      this.setState({
        err: '请输入密码',
      });
    }
  }
  saveUserName() {
    if (/^[a-zA-Z]/.test(this.userNameInput.value)) {
      this.ready.name = true;
      this.setState({
        userName: this.userNameInput.value,
        err: null,
      });
    } else {
      this.ready.name = false;
      this.setState({
        userName: this.userNameInput.value,
        err: '用户名要以字母开头',
      });
    }
  }
  checkAndSubmit() {
    if (this.ready.name && this.ready.email && this.ready.password) {
      this.props.onSubmit({
        email: this.state.email,
        password: this.state.password,
        userName: this.state.userName,
      });
    }
  }
  render() {
    return (
      <div className="login">
        <div className="head"><span>注册</span></div>
        <div className="input-container">
          <div><span>{this.state.err}</span></div>
          <div>
            <input
              type="text"
              ref={(input) => {
                this.emailInput = input;
              }}
              onChange={this.saveEmail}
            />
            <span>email: &nbsp;</span>
          </div>
          <div>
            <input
              type="text"
              ref={(input) => {
                this.userNameInput = input;
              }}
              onChange={this.saveUserName}
            />
            <span>用户名: &nbsp;</span>
          </div>
          <div>
            <input
              type="password"
              ref={(input) => {
                this.passwordInput = input;
              }}
              onChange={this.savePassword}
            />
            <span>密码:&nbsp;</span>
          </div>
          <div className="btn-container">
            <button onClick={this.checkAndSubmit}>注册</button>
            <button onClick={() => this.props.onCancel()}>取消</button>
          </div>
        </div>
      </div>
    );
  }
}
Regist.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
