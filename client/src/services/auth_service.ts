import api_service from "./api_service.tsx";
import type {LoginData, LogoutData, RegistrationData} from "../interfaces/request_data.ts";

async function registerUser(request: RegistrationData) {

    const response = await api_service.post("/user/", request);

    if (response.status !== 201){
        throw Error(response.data);
    }

}

async function loginUser(request: LoginData) {

    const response = await api_service.post("/token/", request);

    if (response.status != 200) {
        throw Error(response.data);
    }

    return {
        access_token: response.data.access,
        refresh_token: response.data.refresh
    };

}

async function logoutUser(request: LogoutData) {
    const response = await api_service.post("/logout/", request);

    if (response.status != 205){
        throw Error(response.data)
    }
}

export const authService = {
    registerUser,
    loginUser,
    logoutUser
}