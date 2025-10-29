import {registerUser, loginUser} from "./auth_query_functions.ts";
import React, {useState} from "react";
import type {registrationData, loginData} from "./auth_query_functions.ts";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../redux_store/store.ts";
import {set_token} from "../redux_store/redux.ts";
function RegistrationPage() {

    const [registrationError, setRegistrationError] = useState("");
    const dispatch: AppDispatch = useDispatch();

    async function registerAccount(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const username: string = formData.get("username") as string;
        const email: string = formData.get("email") as string;
        const password: string = formData.get("password") as string;
        const confirm_password: string = formData.get("confirm_password") as string;

        if (confirm_password !== password) {

            setRegistrationError("Passwords do not match");
            console.log("passwords don't match");
            return;

        }

        const request: registrationData = {
            username: username,
            email: email,
            password: password
        };

        try {

            await registerUser(request);

            const login_data: loginData = {
                username: username,
                password: password
            };

            const token: string = await loginUser(login_data);

            dispatch(set_token(token));

            setRegistrationError("");

        } catch (err: any) {

            setRegistrationError(err);

            console.log(registrationError);

        }

    }

    return (

        <>

            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-900">

                <h1 className="text-[40px] font-medium text-black dark:text-white mb-6 text-center">
                    Create an Account
                </h1>

                <form onSubmit={registerAccount} className="flex flex-col items-center justify-center space-y-6 bg-white dark:bg-gray-800
                p-8 rounded-2xl shadow-lg w-200 text-center text-[25px] font-medium text-black dark:text-white mb-6">

                    <div className="flex flex-col w-full items-center justify-center">

                        <label className="">Username</label>
                        <input className="text-black rounded-[5px] bg-white shadow-[2px] border border-black w-70"
                               type="text" name="username" required/>

                    </div>


                    <div className="flex flex-col w-full items-center justify-center">

                        <label className="">Email</label>
                        <input className="text-black rounded-[5px] bg-white shadow-[2px] border border-black w-70"
                               type="email" name="email" required/>

                    </div>

                    <div className="flex flex-col w-full items-center justify-center">

                        <label className="">Password</label>
                        <input className="text-black rounded-[5px] bg-white shadow-[2px] border border-black w-70"
                               type="password" name="password" required/>

                    </div>

                    <div className="flex flex-col w-full items-center justify-center">

                        <label className="">Confirm Password</label>
                        <input className="text-black rounded-[5px] bg-white shadow-[2px] border border-black w-70"
                               type="password" name="confirm_password" required/>

                    </div>

                    <div className="flex flex-col w-full items-center justify-center py-5">

                        <button className="rounded-[5px] bg-gray-400 shadow-[2px]
                        text-black border border-black w-70" type="submit"> Sign Up
                        </button>

                    </div>

                </form>

            </div>


        </>

    )

}

export default RegistrationPage