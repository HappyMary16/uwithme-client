import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { handleAuthenticationCallback } from '../actions';

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

let Callback = ({ dispatch, user }) => {
  if (user) return <Redirect to="/" />;
  dispatch(handleAuthenticationCallback());

  return <div className="text-center">Loading user profile.</div>;
};
Callback = connect(mapStateToProps)(Callback);

export default Callback;
