import {$host, $authHost} from "./index";

export const getAll = async () => {
    try {
        const {data} = await $authHost.get('api/testing');
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};

export const create = async (createData) => {
    try {
        const {data} = await $host.post('api/testing', createData);
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};

export const getById = async (id) => {
    try {
        const {data} = await $authHost.get(`api/testing/${id}`);
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};

export const edit = async (id, questionWithAnswer) => {
    try {
        const {data} = await $authHost.put(`api/testing/${id}`, { questionWithAnswer });
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};

export const endTest = async (id) => {
    try {
        const {data} = await $authHost.get(`api/testing/end/${id}`);
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};




