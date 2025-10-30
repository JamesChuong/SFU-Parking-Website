import {useEffect, useState} from 'react'
import './App.css'
import { Route, Routes} from "react-router";
import Dashboard from "./homepage/dashboard.tsx";
import LoginPage from "./auth/login.tsx";
import RegistrationPage from "./auth/register.tsx";
import {useDispatch, useSelector} from "react-redux";
// @ts-ignore
import type { RootState, AppDispatch } from './redux_store/store';
import './utils/protected_route.tsx'
import {ProtectedRoute} from "./utils/protected_route.tsx";
import {finish_loading, set_token} from "./redux_store/redux.ts";
function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const dispatch = useDispatch();

    const { isAuthenticated, isLoading } = useSelector(
        (state: RootState) => state.authentication
    );
    // useEffect(
    //     ()=>{
    //
    //         const token = sessionStorage.getItem("access_token")
    //         if (token) {
    //             dispatch(set_token(token)); // reauthenticate using saved token
    //             setIsLoggedIn(true)
    //         } else {
    //             dispatch(finish_loading()); // mark loading as complete
    //         }
    //
    //     }, [dispatch]
    // )

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    console.log(`The user is logged in: ${isAuthenticated}`)

    return (
        <>

            <Routes>
                {/* Add Routes as needed */}


                <Route path='/' element={
                    <ProtectedRoute isLoggedIn={isAuthenticated} children={<Dashboard />}/>
                } />

                <Route path='/dashboard' element={
                    <ProtectedRoute isLoggedIn={isAuthenticated} children={<Dashboard />}/>
                }
                />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
            </Routes>

        </>
    )
}

export default App
