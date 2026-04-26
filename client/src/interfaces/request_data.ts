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

export type {RegistrationData, LoginData, LogoutData}
