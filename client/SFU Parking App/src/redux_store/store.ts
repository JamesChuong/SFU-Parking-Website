import {configureStore} from "@reduxjs/toolkit";
import authenticationReducer from './redux.ts';

export const store = configureStore(
    {
        reducer: authenticationReducer
    }
)

export type AuthState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
