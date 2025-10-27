import axios_config from "../axios_config.tsx";

interface registrationData {
    username: string,
    email: string,
    password: string
}

interface loginData {
    username: string,
    password: string
}

async function registerUser(request: registrationData) {

    const response = await axios_config.post("/api/user/register/", request);

    if (response.status !== 201){
        throw Error(response.data);
    }

}


async function loginUser(request: loginData) {

    const response = await axios_config.post("/api/token/", request);

    if (response.status != 200) {
        throw Error(response.data)
    }

    return response.data.access;

}


export {registerUser, loginUser}
export type {registrationData, loginData}