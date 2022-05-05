import { instance } from "../axiosInstance";

export const registerMechanic = async (data) => {
    const response = await instance.post("/assistance/all", data);
    const { headerResponse, payload } = response.data;

    if (headerResponse?.code !== 200) throw response.data;
    return payload;
};
