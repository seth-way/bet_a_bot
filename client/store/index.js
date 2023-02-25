// update later using @reduxjs/toolkit
import { createStore, combineReducers, applyMiddleware } from 'redux';
// import dummyReducer from './dummyReducer';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

// const reducer = combineReducers({ auth });

const store = createStore(
  // reducer,
  applyMiddleware(thunkMiddleware, createLogger())
);

export default store;
