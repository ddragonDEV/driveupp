import { instance } from "../axiosInstance";

export const getTotalUsers = async () => {
    const response = await instance.post("/analytics/users");
    const { headerResponse, payload } = response.data;

    if (headerResponse?.code !== 200) throw response.data;

    return payload[0];
};


export const getLastUsers = async () => {
    const response = await instance.post("/user/all", {
        role: "",
        rowsPerPage: 5,
        page: 1
    });

    const { headerResponse, payload } = response.data;
    if (headerResponse?.code !== 200) throw response.data;
    return payload.list;
};

export const getLastAssitances = async () => {
    const response = await instance.post("/assistance/all", {
        name: "",
        status: "",
        rowsPerPage: 6,
        page: 1
    });

    const { headerResponse, payload } = response.data;
    if (headerResponse?.code !== 200) throw response.data;
    return payload.list;
};