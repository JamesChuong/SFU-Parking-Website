import axios from "axios";
// @ts-ignore
import {store} from "../redux_store/store.ts";

const api_service = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true

});

// api_service.defaults.headers.common['Authorization'] = token;

api_service.interceptors.request.use(config => {
    const token = store.getState().authentication.token
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

api_service.defaults.headers.common['Content-Type'] = 'application/json'

export default api_service
