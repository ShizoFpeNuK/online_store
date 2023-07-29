import axios, { AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig = {
	baseURL: "https://api.escuelajs.co/api/v1",
};

const platzApi = axios.create(axiosConfig);

export default platzApi;
