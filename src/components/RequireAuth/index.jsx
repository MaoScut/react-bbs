import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import history from '../../history';

export default function (ComposedComponent) {
  class Authentication extends React.Component {
    // static contextTypes = {
    //   router: React
    // }
    componentWillMount() {
      if (!this.props.authenticated) {
        history.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        history.push('/login');
      }
    }
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  Authentication.propTypes = {
    authenticated: PropTypes.bool.isRequired,
  };
  return connect(
    state => ({
      authenticated: state.auth.auth,
    }),
  )(Authentication);
}
