import React from 'react';
import PropTypes from 'prop-types';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.saveEmail = this.saveEmail.bind(this);
    this.savePassword = this.savePassword.bind(this);
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
  render() {
    return (
      <div>
        <div className="grey-cover" />
        <div className="login">
          <div className="head"><span>登录</span></div>
          <div className="input-container">
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
                type="password"
                ref={(input) => {
                  this.passwordInput = input;
                }}
                onChange={this.savePassword}
              />
              <span>passoword:&nbsp;</span>
            </div>
          </div>
          <div className="btn-container">
            <button onClick={() => this.props.onSubmit({
              email: this.state.email,
              password: this.state.password,
            })}
            >登录</button>
            <button onClick={() => this.props.onCancel()}>取消</button>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
// export default connect(
//   state => state,
//   dispatch => ({
//     actions: bindActionCreators(actions, dispatch),
//   }),
// )(Login);
