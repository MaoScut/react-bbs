// 个人中心页面
import React from 'react';
import SetHeadImg from '../../components/SetHeadImg';

export default function ({ actions }) {
  return (
    <div>
      个人中心
      <SetHeadImg onSubmit={actions.setUserHeadImg} />
    </div>
  );
}
