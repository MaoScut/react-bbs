import React from 'react';
import PropTypes from 'prop-types';

export default class Regist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      userName: '',
    };
    this.saveEmail = this.saveEmail.bind(this);
    this.savePassword = this.savePassword.bind(this);
    this.saveUserName = this.saveUserName.bind(this);
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
        <div className="over-cover">
          email:<input
            type="text"
            ref={(input) => {
              this.emailInput = input;
            }}
            onChange={this.saveEmail}
          />
          userName:<input
            type="text"
            ref={(input) => {
              this.userNameInput = input;
            }}
            onChange={this.saveUserName}
          />
          passoword:<input
            type="password"
            ref={(input) => {
              this.passwordInput = input;
            }}
            onChange={this.savePassword}
          />
          <button onClick={() => this.props.onSubmit({
            email: this.state.email,
            password: this.state.password,
            userName: this.state.userName,
          })}
          >regist</button>
          <button onClick={() => this.props.onCancel()}>cancel</button>
        </div>
      </div>
    );
  }
}
Regist.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
