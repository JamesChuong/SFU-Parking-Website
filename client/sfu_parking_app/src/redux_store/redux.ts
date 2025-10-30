import { createSlice } from '@reduxjs/toolkit'

const token = sessionStorage.getItem("access_token");

interface authenticationState {
    token: string | null,
    isAuthenticated: boolean,
    isLoading: boolean
}

let initialState: authenticationState = {
    token: token,
    isAuthenticated: !!token,
    isLoading: true
}

const authenticationSlice = createSlice({
    name: 'authentication_store',
    initialState,
    reducers: {
        set_token: (state, action) => {
            sessionStorage.setItem("access_token", action.payload)
            state.token = action.payload   // payload contains the token
            state.isAuthenticated = true
            state.isLoading = false
        },
        remove_token: (state) => {
            sessionStorage.removeItem("access_token")
            state.token = null
            state.isAuthenticated = false
            state.isLoading = false
        },
        finish_loading: (state) => {
            // explicitly stop loading when app finishes checking if the user is authenticated
            state.isLoading = false;
        }
    }
})

export const {set_token, remove_token, finish_loading} = authenticationSlice.actions
export default authenticationSlice.reducer
