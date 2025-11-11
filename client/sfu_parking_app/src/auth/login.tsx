import React, {useEffect} from "react";
import type {LoginData} from "./auth_query_functions.ts";
import {loginUser} from "./auth_query_functions.ts";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch} from "../redux_store/store.ts";
import {set_token} from "../redux_store/redux.ts";
import {useNavigate} from "react-router";
import {useLocation} from "react-router-dom";
import type {RootState} from "../redux_store/store.ts";
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

        const form_data: FormData = new FormData(e.currentTarget);

        const username: string = form_data.get("username") as string;
        const password: string = form_data.get("password") as string;

        const request: LoginData = {
            username: username,
            password: password
        };

        try{

            const response = await loginUser(request);
            response["username"] = username;
            dispatch(set_token(response));

        } catch (err) {
            setLoginError(err)
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
                            Don't have an account? Register <a href="/register" className="text-blue-200 hover:text-blue-400"> here </a>
                        </p>

                    </div>

                </form>

            </div>

        </>

    )

}

export default LoginPage