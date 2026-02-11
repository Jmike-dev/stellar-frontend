import axios from "axios";
import { toast } from "sonner";

const VITE_BASE_URL = "";

export const api = axios.create({
    baseURL: VITE_BASE_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        toast.error("Request setup error");
        return Promise.reject(error);
    },
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.message ||
            "Something went wrong";

        toast.error(message);
        return Promise.reject(error);
    },
);
