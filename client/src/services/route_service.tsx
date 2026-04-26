import {Route, Routes} from "react-router";
import {ProtectedRoute} from "@/utils/protected_route.tsx";
import Dashboard from "@/dashboard/dashboard.tsx";
import Test from "@/test.tsx";
import LoginPage from "@/auth/login.tsx";
import RegistrationPage from "@/auth/register.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "@/redux_store/store.ts";

function AppRoutes() {

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

export default AppRoutes