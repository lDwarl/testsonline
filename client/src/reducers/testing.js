import {SET_TESTING, REMOVE_TESTING, SET_ALL_TESTING} from '../utils/actionsConst';

const defaultState = null;

export default (state = defaultState, action) => {
    switch (action.type) {
        // for students when they do test
        case SET_TESTING:
            return { ...action.data };
        case REMOVE_TESTING:
            return defaultState;
        // for admin list of testing
        case SET_ALL_TESTING:
            return [ ...action.data ];
        default:
            return state;
    }
};
