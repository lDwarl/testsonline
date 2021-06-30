import {
    createStore,
    combineReducers,
    compose,
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';

import error from './reducers/error';
import user from './reducers/user';
import subject from './reducers/subject';
import test from './reducers/test';
import testing from './reducers/testing';

const initialState = {};

const middlewares = [
    thunk
];

const composedEnhancers = compose(
    applyMiddleware(...middlewares)
);

const reducers = {
    error,
    user,
    subject,
    test,
    testing,
};

const rootReducer = combineReducers({ ...reducers });

const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers
);

//for development
window.store = store;

export default store;



