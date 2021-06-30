import {$host, $authHost} from "./index";

export const create = async (createData) => {
    try {
        const {data} = await $authHost.post('api/test', createData);
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};

export const getAll = async () => {
    try {
        const {data} = await $host.get('api/test');
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};

export const getById = async (id) => {
    try {
        const {data} = await $host.get(`api/test/${id}`);
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};

export const edit = async (id, editData) => {
    try {
        const {data} = await $authHost.put(`api/test/${id}`, editData);
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};

export const remove = async (id) => {
    try {
        const {data} = await $authHost.delete(`api/test/${id}`);
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};

export const addTestQuestion = async (testId, questionData) => {
    try {
        const {data} = await $authHost.post(`api/test/question/${testId}`, questionData);
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};

export const removeQuestion = async (id, question) => {
    try {
        const {data} = await $authHost.put(`api/test/question/${id}`, {question});
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};


