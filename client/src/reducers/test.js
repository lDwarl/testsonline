import {SET_ALL_TESTS, ADD_NEW_TESTS, UPDATE_TESTS, REMOVE_TESTS} from '../utils/actionsConst';

const defaultState = [];

export default (state = defaultState, action) => {
    switch (action.type) {
        case SET_ALL_TESTS:
            return [ ...action.data ];
        case ADD_NEW_TESTS:
            return [ ...state, action.data ];
        case UPDATE_TESTS:
            return state.map(test => test._id === action.data._id
                ? action.data
                : test
            );
        case REMOVE_TESTS:
            return state.filter(test => test._id !== action.id);
        default:
            return state;
    }
};
