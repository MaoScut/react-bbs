import React from 'react';
import PropTypes from 'prop-types';
import Login from '../Login';
import Regist from '../Regist';

export function LoginPop({ onSubmit, onCancel, err }) {
  return (
    <div>
      <Login onSubmit={onSubmit} onCancel={onCancel} err={err} />
    </div>
  );
}

export function RegistPop({ onSubmit, onCancel, err }) {
  return (
    <div>
      <Regist onSubmit={onSubmit} onCancel={onCancel} err={err} />
    </div>
  );
}
LoginPop.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
RegistPop.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
