import axios from "axios";
// @ts-ignore
import {store} from "./redux_store/store.ts";

const axios_config = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true

});

// axios_config.defaults.headers.common['Authorization'] = useSelector((state: AuthState) => state.authentication.token);

axios_config.interceptors.request.use(config => {
    const token = store.getState().authentication.token
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

axios_config.defaults.headers.common['Content-Type'] = 'application/json'

export default axios_config
