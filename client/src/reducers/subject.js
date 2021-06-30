import {SET_ALL_SUBJECTS, ADD_NEW_SUBJECT, UPDATE_SUBJECT, REMOVE_SUBJECT} from '../utils/actionsConst';

const defaultState = [];

export default (state = defaultState, action) => {
    switch (action.type) {
        case SET_ALL_SUBJECTS:
            return [ ...action.data ];
        case ADD_NEW_SUBJECT:
            return [ ...state, action.data ];
        case UPDATE_SUBJECT:
            return state.map(subject => subject._id === action.data._id
                ? action.data
                : subject
            );
        case REMOVE_SUBJECT:
            return state.filter(subject => subject._id !== action.id);
        default:
            return state;
    }
};
