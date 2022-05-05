import axios from "axios";
import { getItem } from '../utils/persistentStorage';
import { config } from "./config";

export const instance = axios.create({
    baseURL: config.mainBackendUrl,
    timeout: 60000,
    headers: {
        "Content-Type": "application/json"
    }
});

instance.interceptors.request.use(
    config => {
        const token = getItem("token");
        if (token) config.headers.Authorization = `Bearer ${ token }`;

        return config;
    },
    error => Promise.reject(error)
);

instance.interceptors.response.use(
    response => response,
    error => Promise.reject(error.response)
);