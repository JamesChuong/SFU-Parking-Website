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

async function registerUser(request: RegistrationData) {

    const response = await axios_config.post("/api/user/", request);

    if (response.status !== 201){
        throw Error(response.data);
    }

}


async function loginUser(request: LoginData) {

    const response = await axios_config.post("/token/", request);

    if (response.status != 200) {
        throw Error(response.data)
    }

    return response.data.access;

}


export {registerUser, loginUser}
export type {RegistrationData, LoginData}