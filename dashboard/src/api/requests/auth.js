import { instance } from "../axiosInstance";

export const loginUser = async (data) => {
    const response = await instance.post("/auth/login", data);

    const { headerResponse, payload } = response.data;
    if (headerResponse?.code !== 200) throw response.data;
    return payload;
};

export const logoutUser = async () => {
    const response = await instance.post("/auth/logout");

    const { headerResponse, payload } = response.data;
    if (headerResponse?.code !== 200) throw response.data;
    return payload;
};


export const refreshToken = async () => {
    const response = await instance.post("/auth/refresh-token");

    const { headerResponse, payload } = response.data;
    if (headerResponse?.code !== 200) throw response.data;
    return payload;
};