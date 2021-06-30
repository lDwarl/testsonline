import * as testingApi from "../http/testingApi";
import {
    SET_TESTING,
    REMOVE_TESTING,
    SET_ALL_TESTING,
} from "../utils/actionsConst";
import {setError} from "./error";

const setTesting = data => ({
    type: SET_TESTING,
    data
});

const setAllTesting = data => ({
   type: SET_ALL_TESTING,
   data
});

const removeTesting = () => ({
    type: REMOVE_TESTING
});

export const startTesting = data => async dispatch => {
    const response = await testingApi.create(data);

    if (!response.success) {
        dispatch(setError(response.message));
        return false;
    }
    localStorage.setItem('token', response.token);
    dispatch(setTesting(response.testing));
    return response.testing._id;
}

export const getTesting = id => async dispatch => {
    const response = await testingApi.getById(id);

    if (!response.success) {
        return dispatch(setError(response.message));
    }

    dispatch(setTesting(response.testing));
}

export const updateTesting = (id, questionWithAnswer) => async dispatch => {
    const response = await testingApi.edit(id, questionWithAnswer);

    if (!response.success) {
        return dispatch(setError(response.message));
    }

    dispatch(setTesting(response.testing));
}

export const endTest = id => async dispatch => {
    const response = await testingApi.endTest(id);

    if (!response.success) {
        return dispatch(setError(response.message));
    }

    localStorage.removeItem('token');
    dispatch(removeTesting());
    return true;
}

export const getAllTesting = () => async dispatch => {
    const response = await testingApi.getAll();

    if (!response.success) {
        return dispatch(setError(response.message));
    }

    dispatch(setAllTesting(response.testing));
}
