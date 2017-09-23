import React from 'react';
import PropTypes from 'prop-types';

export default class Regist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      userName: '',
      err: this.props.err,
    };
    this.saveEmail = this.saveEmail.bind(this);
    this.savePassword = this.savePassword.bind(this);
    this.saveUserName = this.saveUserName.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      err: nextProps.err,
    });
  }
  saveEmail() {
    this.setState({
      email: this.emailInput.value,
    });
  }
  savePassword() {
    this.setState({
      password: this.passwordInput.value,
    });
  }
  saveUserName() {
    this.setState({
      userName: this.userNameInput.value,
    });
  }
  render() {
    return (
      <div>
        <div className="grey-cover" />
        <div className="login">
          <div className="head"><span>注册</span></div>
          <div className="input-container">
            {this.props.err ? (<div><span>{this.props.err.message}</span></div>) : null}
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
              <button onClick={() => this.props.onSubmit({
                email: this.state.email,
                password: this.state.password,
                userName: this.state.userName,
              })}
              >注册</button>
              <button onClick={() => this.props.onCancel()}>取消</button>
            </div>
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
