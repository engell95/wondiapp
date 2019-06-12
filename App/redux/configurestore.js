import {createStore, applyMiddleware} from 'redux';
import Reducers from './reducers'
import thunk from 'redux-thunk'

const middleware = [thunk];
const initialState = {};

export default createStore(Reducers, initialState, applyMiddleware(...middleware));