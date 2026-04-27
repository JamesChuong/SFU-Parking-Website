interface AuthenticationState {
    token: string | null,
    refresh_token: string | null,
    username: string | null,
    isAuthenticated: boolean,
}

export type { AuthenticationState }