
function RegistrationPage() {

    return (

        <>

            <body className="flex flex-col items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-900">

                <h1 className="text-[40px] font-medium text-black dark:text-white mb-6 text-center">
                    Create an Account
                </h1>

                <form className="flex flex-col items-center justify-center space-y-6 bg-white dark:bg-gray-800
                p-8 rounded-2xl shadow-lg w-200 text-center text-[25px] font-medium text-black dark:text-white mb-6 pl-6">

                    <div className="flex flex-col w-full items-center justify-center py-5">

                        <label className="">Username</label>
                        <input className="rounded-[5px] bg-white shadow-[2px] border border-black w-70" type="text"/>

                    </div>


                    <div className="flex flex-col w-full items-center justify-center py-5">

                        <label className="">Email</label>
                        <input className="rounded-[5px] bg-white shadow-[2px] border border-black w-70" type="email"/>

                    </div>

                    <div className="flex flex-col w-full items-center justify-center py-5">

                        <label className="">Password</label>
                        <input className="rounded-[5px] bg-white shadow-[2px] border border-black w-70" type="password"/>

                    </div>

                </form>

            </body>


        </>

    )

}

export default RegistrationPage