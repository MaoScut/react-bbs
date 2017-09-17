import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../action/async';

function FloorOption({ auth, topic, actions }) {
  return (
    <aside>
      <i className="iconfont icon-aixin" />
      <i className="iconfont icon-lianjie" />
      <i className="iconfont icon-gengduo" />
      <span>reply</span>
    </aside>
  );
}

export default connect(
  state => ({
    topic: state.detail[0],
    auth: state.auth.auth,
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
  }),
)(FloorOption);
