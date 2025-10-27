import {useEffect, useState} from 'react'
import './App.css'
import { Route, Routes} from "react-router";
import Dashboard from "./homepage/dashboard.tsx";
import LoginPage from "./auth/login.tsx";
import RegistrationPage from "./auth/register.tsx";
import {useSelector} from "react-redux";
// @ts-ignore
import type { RootState, AppDispatch } from './redux_store/store';
import './utils/protected_route.tsx'
import ProtectedRoute from "./utils/protected_route.tsx";
function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const isAuth = useSelector((state: RootState) => state.authentication.isAuthenticated);

    useEffect(
        ()=>{

            setIsLoggedIn(isAuth)


        }, []
    )

    return (
        <>

            <Routes>
                {/* Add Routes as needed */}

                <Route path='/dashboard' element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Dashboard />
                    </ProtectedRoute>
                }
                />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
            </Routes>

        </>
    )
}

export default App
