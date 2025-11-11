import {useEffect, useState} from 'react'
import './App.css'
import { Route, Routes} from "react-router";
import Dashboard from "./homepage/dashboard.tsx";
import LoginPage from "./auth/login.tsx";
import RegistrationPage from "./auth/register.tsx";
import { useSelector } from "react-redux";
// @ts-ignore
import type { RootState, AppDispatch } from './redux_store/store';
import './utils/protected_route.tsx'
import {ProtectedRoute} from "./utils/protected_route.tsx";
import Test from "./test.tsx";
function App() {

    const { isAuthenticated } = useSelector(
        (state: RootState) => state.authentication
    );
    return (
        <>

            <Routes>
                {/* Add Routes as needed */}


                <Route path='/' element={
                    <ProtectedRoute isLoggedIn={isAuthenticated} children={<Dashboard />}/>
                } />

                <Route path='/dashboard' element={
                    <ProtectedRoute isLoggedIn={isAuthenticated} children={<Dashboard />}/>
                } />

                <Route path='/test' element={
                    <ProtectedRoute isLoggedIn={isAuthenticated} children={<Test />}/>
                } />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
            </Routes>

        </>
    )
}

export default App
