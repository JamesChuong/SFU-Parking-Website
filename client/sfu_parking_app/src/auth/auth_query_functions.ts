import axios_config from "../axios_config.tsx";

interface RegistrationData {
    username: string,
    email: string,
    password: string
}

interface LoginData {
    username: string,
    password: string
}

interface LogoutData {
    refresh_token: string
}

async function registerUser(request: RegistrationData) {

    const response = await axios_config.post("/api/user/", request);

    if (response.status !== 201){
        throw Error(response.data);
    }

}


async function loginUser(request: LoginData) {

    const response = await axios_config.post("/token/", request);

    if (response.status != 200) {
        throw Error(response.data);
    }

    return {
        access_token: response.data.access,
        refresh_token: response.data.refresh
    };

}


async function logoutUser(request: LogoutData) {
    const response = await axios_config.post("/api/logout/", request);

    if (response.status != 205){
        throw Error(response.data)
    }

}


export {registerUser, loginUser, logoutUser}
export type {RegistrationData, LoginData, LogoutData}