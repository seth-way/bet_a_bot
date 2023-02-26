import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { me } from './store';
// components
import LogIn from './components/LogIn';

const App = props => {
  useEffect(() => {
    props.loadInitialData;
  }, []);

  console.log(
    'props from app.... ',
    props.user,
    ' ...is loggen in? ',
    props.isLoggedIn
  );

  if (!props.isLoggedIn) return <LogIn />;
  return <div>Hello Bet-A-Bot, Logged In Baybay!!!</div>;
};

const mapState = state => ({
  // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
  // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
  isLoggedIn: !!state.auth.id,
  user: state.user,
  id: state.auth.id,
});

const mapDispatch = dispatch => ({
  loadInitialData: () => {
    dispatch(me());
  },
});

export default connect(mapState, mapDispatch)(App);
