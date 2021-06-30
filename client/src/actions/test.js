import * as testApi from "../http/testApi";
import {
    SET_ALL_TESTS,
    ADD_NEW_TESTS,
    UPDATE_TESTS,
    REMOVE_TESTS
} from "../utils/actionsConst";
import {setError} from "./error";

const setTests = data => ({
    type: SET_ALL_TESTS,
    data
});

const addNewTest = data => ({
    type: ADD_NEW_TESTS,
    data
});

const updateTest = data => ({
    type: UPDATE_TESTS,
    data
});

const testRemove = id => ({
    type: REMOVE_TESTS,
    id
});

export const getAllTests = () => async dispatch => {
    const response = await testApi.getAll();

    if (!response.success) {
        return dispatch(setError(response.message));
    }

    dispatch(setTests(response.tests));
}

export const createTest = data => async dispatch => {
    const response = await testApi.create(data);

    if (!response.success) {
        return dispatch(setError(response.message));
    }

    dispatch(addNewTest(response.test));
}

export const editTest = (subjectId, data) => async dispatch => {
    const response = await testApi.edit(subjectId, data);

    if (!response.success) {
        return dispatch(setError(response.message));
    }

    dispatch(updateTest(response.test));
}

export const removeTest = subjectId => async dispatch => {
    const response = await testApi.remove(subjectId);

    if (!response.success) {
        return dispatch(setError(response.message));
    }

    dispatch(testRemove(response.removedId));
}

export const addTestQuestion = (testId, data) => async dispatch => {
    const response = await testApi.addTestQuestion(testId, data);

    if (!response.success) {
        return dispatch(setError(response.message));
    }

    dispatch(updateTest(response.test));
}

export const removeTestQuestion = (testId, question) => async dispatch => {
    const response = await testApi.removeQuestion(testId, question);

    if (!response.success) {
        return dispatch(setError(response.message));
    }

    dispatch(updateTest(response.test));
}
