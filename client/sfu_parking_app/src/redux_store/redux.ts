import { createSlice } from '@reduxjs/toolkit'

const token = sessionStorage.getItem("access_token");
const refresh_token = sessionStorage.getItem("refresh_token");
interface authenticationState {
    token: string | null,
    refresh_token: string | null,
    username: string | null,
    isAuthenticated: boolean,
}

let initialState: authenticationState = {
    token: token,
    refresh_token: refresh_token,
    username: null,
    isAuthenticated: !!token,
}

const authenticationSlice = createSlice({
    name: 'authentication_store',
    initialState,
    reducers: {
        set_token: (state, action) => {
            sessionStorage.setItem("access_token", action.payload.access_token);
            sessionStorage.setItem("refresh_token", action.payload.refresh_token);

            state.token = action.payload.access_token;   // payload contains the token
            state.refresh_token = action.payload.refresh_token;
            state.username = action.payload.username;
            state.isAuthenticated = true;
        },
        remove_token: (state) => {
            sessionStorage.removeItem("access_token");
            sessionStorage.removeItem("refresh_token");
            state.token = null;
            state.refresh_token = null;
            state.username = null;
            state.isAuthenticated = false;
        },
    }
})

export const {set_token, remove_token} = authenticationSlice.actions
export default authenticationSlice.reducer
