import { createSlice } from '@reduxjs/toolkit'


interface authenticationState {
    token: string | null,
    isAuthenticated: boolean
}

let initialState: authenticationState = {
    token: null,
    isAuthenticated: false
}

const authenticationSlice = createSlice({
    name: 'authentication_store',
    initialState,
    reducers: {
        set_token: (state, action) => {
            state.token = action.payload   // payload contains the token
            state.isAuthenticated = true
        },
        remove_token: (state) => {
            state.token = null
            state.isAuthenticated = false
        }
    }
})

export const {set_token, remove_token} = authenticationSlice.actions
export default authenticationSlice.reducer
