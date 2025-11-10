import {useState} from "react";
import {AccountSideBar} from "./account_sidebar.tsx";

interface NavBarProps{
    username: string
}

function NavigationBar(props: NavBarProps){

    const [sideBarOpen, setSideBarOpen] = useState(false);

    function openSideBar(){
        setSideBarOpen(!sideBarOpen)
    }

    return (

        <div className="relative">
            <nav
                className="relative bg-gray-800 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10">

                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">

                    <div className="relative flex h-16 flex-row justify-evenly">
                        <div className="relative flex flex-row justify-center">
                            <div className="flex space-x-4 p-2">

                                <a href="/dashboard" aria-current="page"
                                   className="flex items-center justify-center rounded-md bg-gray-950/50 px-3 py-2 text-sm font-medium text-white">
                                    Dashboard
                                </a>

                                <a href="#"
                                   className="flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5">
                                    Find Matches
                                </a>

                                <a href="#"
                                   className="flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5">
                                    Schedule
                                </a>

                            </div>

                        </div>

                        <div className="relative flex flex-row justify-center">

                            <div className="relative flex flex-row justify-center">

                                <div className="flex space-x-4 p-2">

                                    <button type="button"
                                            className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
                                        <span className="absolute -inset-1.5"></span>
                                        <span className="sr-only">View notifications</span>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                                             data-slot="icon" aria-hidden="true" className="size-6">
                                            <path
                                                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                                                stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>

                                    <button type="button"
                                            className="relative flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium rounded-md p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 text-white"
                                            onClick={openSideBar}>
                                        {props.username}
                                    </button>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </nav>

            <AccountSideBar open={sideBarOpen} username={props.username}/>

        </div>

    )

}

export {NavigationBar}
export type {NavBarProps}