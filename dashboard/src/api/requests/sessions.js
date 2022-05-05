import { instance } from "../axiosInstance";

export const analyticsGetSessions = async (data) => {
    const response = await instance.post("/analytics/sessions/by-role", data);

    const { headerResponse, payload } = response.data;
    if (headerResponse?.code !== 200) throw response.data;
    return payload;
};