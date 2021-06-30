import {$host, $authHost} from "./index";

export const create = async (createData) => {
    try {
        const {data} = await $authHost.post('api/subject', createData);
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};

export const getAll = async () => {
    try {
        const {data} = await $host.get('api/subject');
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};

export const getById = async (id) => {
    try {
        const {data} = await $host.get(`api/subject/${id}`);
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};

export const edit = async (id, editData) => {
    try {
        const {data} = await $authHost.put(`api/subject/${id}`, editData);
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};

export const remove = async (id) => {
    try {
        const {data} = await $authHost.delete(`api/subject/${id}`);
        return data;
    } catch (e) {
        const {data} = e.response;
        return data;
    }
};



