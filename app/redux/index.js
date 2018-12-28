import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import login from 'reducers/loginReducer';
import profile from 'reducers/profileReducer';
import thunkMiddleware from 'redux-thunk';

const reducer = combineReducers({ login, profile });
const store = createStore(reducer, applyMiddleware(thunkMiddleware, logger));

export * from 'reducers/loginReducer';
export * from 'reducers/profileReducer';
export default store;
