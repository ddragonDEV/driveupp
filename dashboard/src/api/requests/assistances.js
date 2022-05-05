import { instance } from "../axiosInstance";

export const getAssistances = async ({ name, status, rowsPerPage, page }) => {
    const response = await instance.post("/assistance/all", {
        name,
        status,
        rowsPerPage,
        page
    });

    const { headerResponse, payload } = response.data;
    if (headerResponse?.code !== 200) throw response.data;
    return payload;
};


export const analyticsGetAssistancesByMechanic = async (data) => {
    const response = await instance.post("/analytics/assistance/by-mechanic", data);

    const { headerResponse, payload } = response.data;
    if (headerResponse?.code !== 200) throw response.data;
    return payload;
};

export const analyticsGetAssistancesByZone = async (data) => {
    const response = await instance.post("/analytics/assistance/by-zone", data);

    const { headerResponse, payload } = response.data;
    if (headerResponse?.code !== 200) throw response.data;
    return payload;
};