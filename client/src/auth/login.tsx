import React, {useEffect, useState} from "react";
import type {LoginData} from "@/interfaces/request_data.ts";
import {authService} from "@/services/auth_service.ts";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch} from "@/redux_store/store.ts";
import {set_token} from "@/redux_store/redux.ts";
import {useNavigate} from "react-router";
import {useLocation} from "react-router-dom";
import type {RootState} from "@/redux_store/store.ts";
import type {AuthenticationState} from "@/interfaces/state_data.ts";


function LoginPage() {

    const [loginError, setLoginError] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch: AppDispatch = useDispatch()
    const { isAuthenticated } = useSelector((state: RootState) => state.authentication);


    useEffect(() => {
        if (isAuthenticated) {

            // Get route redirected from
            const from = (location.state as { from?: string })?.from || "/dashboard";

            navigate(from, { replace: true });

        }
    }, [isAuthenticated, navigate, location]);

    async function loginAccount(e: React.FormEvent<HTMLFormElement>){

        e.preventDefault();

        const formData: FormData = new FormData(e.currentTarget);

        const username: string = formData.get("username") as string;
        const password: string = formData.get("password") as string;

        const request: LoginData = {
            username: username,
            password: password
        };

        try{

            const response = await authService.loginUser(request);

            const newAuthenticationState : AuthenticationState = {
                token: response.access_token,
                refresh_token: response.refresh_token,
                username: username,
                isAuthenticated: true
            }

            dispatch(set_token(newAuthenticationState));

        } catch (err: any) {
            setLoginError(err.message)
        }
    }

    return (

        <>

            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-900">

                <h1 className="text-[40px] font-medium text-black dark:text-white mb-6 text-center">
                    Sign In
                </h1>

                <form onSubmit={loginAccount} className="flex flex-col items-center justify-center space-y-6 bg-white dark:bg-gray-800
                p-8 rounded-2xl shadow-lg w-200 text-center text-[25px] font-medium text-black dark:text-white mb-6">

                    <div className="flex flex-col w-full items-center justify-center">

                        <label className="">Username</label>
                        <input className="text-black rounded-[5px] bg-white shadow-[2px] border border-black w-70"
                               type="text" name="username" required/>

                    </div>


                    <div className="flex flex-col w-full items-center justify-center">

                        <label className="">Password</label>
                        <input className="text-black rounded-[5px] bg-white shadow-[2px] border border-black w-70"
                               type="password" name="password" required/>

                    </div>

                    <div className="flex flex-col w-full items-center justify-center py-5">

                        <button className="rounded-[5px] bg-gray-400 shadow-[2px]
                        text-black border border-black w-70 hover:bg-grey-800 hover:border-transparent" type="submit"> Sign In
                        </button>

                    </div>

                    <div className="flex items-center justify-center text-center text-[15px]">

                        <p>
                            Don't have an account? Register <a href="/register" className="text-blue-400 hover:text-blue-600"> here </a>
                        </p>

                    </div>

                </form>

            </div>

        </>

    )

}

export default LoginPage