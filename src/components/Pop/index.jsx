import React from 'react';
import Login from '../Login';
import Regist from '../Regist';

export function LoginPop({ onSubmit, onCancel }) {
  return (
    <div>
      <Login onSubmit={onSubmit} onCancel={onCancel} />
    </div>
  );
}

export function RegistPop({ onSubmit, onCancel }) {
  return (
    <div>
      <Regist onSubmit={onSubmit} onCancel={onCancel} />
    </div>
  );
}
