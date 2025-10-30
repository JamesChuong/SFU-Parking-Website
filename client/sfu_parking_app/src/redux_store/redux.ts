import { createSlice } from '@reduxjs/toolkit'

const token = sessionStorage.getItem("access_token");

interface authenticationState {
    token: string | null,
    isAuthenticated: boolean,
}

let initialState: authenticationState = {
    token: token,
    isAuthenticated: !!token,
}

const authenticationSlice = createSlice({
    name: 'authentication_store',
    initialState,
    reducers: {
        set_token: (state, action) => {
            sessionStorage.setItem("access_token", action.payload)
            state.token = action.payload   // payload contains the token
            state.isAuthenticated = true
        },
        remove_token: (state) => {
            sessionStorage.removeItem("access_token")
            state.token = null
            state.isAuthenticated = false
        },
    }
})

export const {set_token, remove_token} = authenticationSlice.actions
export default authenticationSlice.reducer
