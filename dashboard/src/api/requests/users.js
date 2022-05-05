import { instance } from "../axiosInstance";

export const getUsers = async ({ name, role, rowsPerPage, page }) => {
    const response = await instance.post("/user/all", {
        name,
        role,
        rowsPerPage,
        page
    });

    const { headerResponse, payload } = response.data;
    if (headerResponse?.code !== 200) throw response.data;
    return payload;
};


export const getUserById = async (id) => {
    const response = await instance.post("/user/get-by-id", {
        _id: id
    });

    const { headerResponse, payload } = response.data;
    if (headerResponse?.code !== 200) throw response.data;
    return payload;
};


export const deleUserById = async (id, status) => {
    const response = await instance.post("/user/disable", {
        _id: id,
        deleted: status
    });

    const { headerResponse, payload } = response.data;
    if (headerResponse?.code !== 200) throw response.data;
    return payload;
};

export const createMechanic = async (data) => {
    const response = await instance.post("/user/mechanic", data);

    const { headerResponse, payload } = response.data;
    if (headerResponse?.code !== 200) throw response.data;
    return payload;
};