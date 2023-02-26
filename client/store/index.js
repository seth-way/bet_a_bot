// update later using @reduxjs/toolkit
import { createStore, combineReducers, applyMiddleware } from 'redux';
import auth from './auth';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const reducer = combineReducers({ auth });

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, createLogger())
);

export default store;
export * from './auth';
