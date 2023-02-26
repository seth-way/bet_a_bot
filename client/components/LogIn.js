import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';

const LogIn = props => {
  useEffect(() => {
    props.handleSubmit();
  }, []);

  console.log('Props from Login... ', props);

  return <div>Login Screen</div>;
};

// const mapState = state => ({});

const mapDispatch = dispatch => ({
  handleSubmit: () => {
    //evt.preventDefault();
    dispatch(authenticate('b', 'money', 'signup'));
  },
});

export default connect(null, mapDispatch)(LogIn);
