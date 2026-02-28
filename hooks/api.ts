import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: process.env.BASE_URL
});