import {registerUser, loginUser} from "./query_functions.ts";
import {useState} from "react";
import type {registrationData, loginData} from "./query_functions.ts";

function RegistrationPage() {

    const [registrationError, setRegistrationError] = useState(null);

    function registerAccount(formData) {

        const username: string = formData.get("username");
        const email: string = formData.get("email");
        const password: string = formData.get("password")

        const request: registrationData = {
            username: username,
            email: email,
            password: password
        }

        try {

            registerUser(request);

            setRegistrationError(null)

        } catch (err){
            setRegistrationError(err)
        }

    }

    return (

        <>

            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-900">

                <h1 className="text-[40px] font-medium text-black dark:text-white mb-6 text-center">
                    Create an Account
                </h1>

                <form className="flex flex-col items-center justify-center space-y-6 bg-white dark:bg-gray-800
                p-8 rounded-2xl shadow-lg w-200 text-center text-[25px] font-medium text-black dark:text-white mb-6">

                    <div className="flex flex-col w-full items-center justify-center">

                        <label name="username" className="">Username</label>
                        <input className="text-black rounded-[5px] bg-white shadow-[2px] border border-black w-70" type="text"/>

                    </div>


                    <div className="flex flex-col w-full items-center justify-center">

                        <label className="">Email</label>
                        <input className="text-black rounded-[5px] bg-white shadow-[2px] border border-black w-70" type="email"/>

                    </div>

                    <div className="flex flex-col w-full items-center justify-center">

                        <label className="">Password</label>
                        <input className="text-black rounded-[5px] bg-white shadow-[2px] border border-black w-70"
                               type="password"/>

                    </div>

                    <div className="flex flex-col w-full items-center justify-center py-5">

                        <button className="rounded-[5px] bg-gray-400 shadow-[2px]
                        text-black border border-black w-70"> Sign Up </button>

                    </div>

                </form>

            </div>


        </>

    )

}

export default RegistrationPage