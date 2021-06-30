import * as subjectApi from "../http/subjectApi";
import {
    SET_ALL_SUBJECTS,
    ADD_NEW_SUBJECT,
    UPDATE_SUBJECT,
    REMOVE_SUBJECT,
} from "../utils/actionsConst";
import {setError} from "./error";

const setSubjects = data => ({
   type: SET_ALL_SUBJECTS,
   data
});

const addNewSubject = data => ({
   type: ADD_NEW_SUBJECT,
    data
});

const updateSubject = data => ({
    type: UPDATE_SUBJECT,
    data
});

const subjectRemove = id => ({
   type: REMOVE_SUBJECT,
   id
});

export const getAllSubjects = () => async dispatch => {
    const response = await subjectApi.getAll();

    if (!response.success) {
        return dispatch(setError(response.message));
    }

    dispatch(setSubjects(response.subjects));
}

export const createSubject = data => async dispatch => {
    const response = await subjectApi.create(data);

    if (!response.success) {
        return dispatch(setError(response.message));
    }

    dispatch(addNewSubject(response.subject));
}

export const editSubject = (subjectId, data) => async dispatch => {
    const response = await subjectApi.edit(subjectId, data);

    if (!response.success) {
        return dispatch(setError(response.message));
    }

    dispatch(updateSubject(response.subject));
}

export const removeSubject = subjectId => async dispatch => {
    const response = await subjectApi.remove(subjectId);

    if (!response.success) {
        return dispatch(setError(response.message));
    }

    dispatch(subjectRemove(response.removedId));
}

