import React from 'react';
import PropTypes from 'prop-types';
import Login from '../../components/Login';
import Regist from '../../components/Regist';
import Editor from '../../components/Editor';
import ReplyPop from '../../components/ReplyPop';
import './main.scss';

export default function Pop(props) {
  const actions = props.actions;
  const err = props.error;
  const all = [props.auth.login, props.auth.regist, props.editor.create];
  if (!all.some(v => v)) return null;
  return (
    <div>
      <div className="gray-cover" />
      {props.auth.login ?
        <Login
          onSubmit={actions.loginUser}
          onCancel={actions.toggleLogin}
          err={err.loginErr}
        /> :
        null}
      {props.auth.regist ?
        <Regist
          onSubmit={actions.registUser}
          onCancel={actions.toggleRegist}
          err={err.registErr}
        /> :
        null}
      {props.editor.create ?

        <Editor
          article={props.editor.topic}
          onSave={actions.saveTopic}
          onCancel={actions.cancelEdit}
        /> :
        null}
      {/* {props.editor.reply ?
        <ReplyPop onSubmit={onSubmit} onCancel={onCancel} err={err} /> : null} */}
    </div>
  );
}
