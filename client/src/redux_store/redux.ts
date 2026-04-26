import { createSlice } from '@reduxjs/toolkit'
import type { AuthenticationState } from "@/interfaces/state_data.ts";

const token = sessionStorage.getItem("access_token");
const refresh_token = sessionStorage.getItem("refresh_token");
const username = sessionStorage.getItem("username");

let initialState: AuthenticationState = {
    token: token,
    refresh_token: refresh_token,
    username: username,
    isAuthenticated: !!token,
}

const authenticationSlice = createSlice({
    name: 'authentication_store',
    initialState,
    reducers: {
        set_token: (state : AuthenticationState, action) => {
            sessionStorage.setItem("access_token", action.payload.access_token);
            sessionStorage.setItem("refresh_token", action.payload.refresh_token);
            sessionStorage.setItem("username", action.payload.username);
            state.token = action.payload.access_token;   // payload contains the token
            state.refresh_token = action.payload.refresh_token;
            state.username = action.payload.username;
            state.isAuthenticated = true;
        },
        remove_token: (state : AuthenticationState) => {
            sessionStorage.removeItem("access_token");
            sessionStorage.removeItem("refresh_token");
            sessionStorage.removeItem("username");
            state.token = null;
            state.refresh_token = null;
            state.username = null;
            state.isAuthenticated = false;
        },
    }
})

export const {set_token, remove_token} = authenticationSlice.actions
export default authenticationSlice.reducer
