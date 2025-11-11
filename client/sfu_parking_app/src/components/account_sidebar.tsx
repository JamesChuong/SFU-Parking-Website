import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../redux_store/store.ts";
import {remove_token} from "../redux_store/redux.ts";
import type {LogoutData} from "../auth/auth_query_functions.ts";
import {logoutUser} from "../auth/auth_query_functions.ts";
import {useNavigate} from "react-router";
import {useEffect} from "react";

interface SideBarProps{
    open: boolean
    username: string
}

function AccountSideBar(props: SideBarProps){

    const navigate = useNavigate();

    const dispatch: AppDispatch = useDispatch();
    const { refresh_token, isAuthenticated } = useSelector((state: RootState) => state.authentication);

    useEffect(() => {

        if (!isAuthenticated){
            navigate('/');
            window.location.reload();
        }

    }, [isAuthenticated, navigate]);

    async function logout() {

        try {

            const request: LogoutData = {

                refresh_token: refresh_token

            };

            const response = await logoutUser(request);

            dispatch(remove_token());

            navigate('/');
            window.location.reload();

        } catch (err) {
            console.log(err)
        }

    }

    return (
        <>
            <div>

                <div
                    className={`fixed top-0 right-0 h-full w-64 bg-gray-800 text-white p-4 transform transition-transform duration-300 ${
                      props.open ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <h2 className="text-xl font-semibold mb-4">{props.username}</h2>
                    <ul>
                        <li className="mb-2">
                            <button onClick={logout} className="w-full text-left px-2 py-1 hover:bg-gray-700 rounded">
                                Profile
                            </button>
                        </li>
                        <li className="mb-2">
                            <button onClick={logout} className="w-full text-left px-2 py-1 hover:bg-gray-700 rounded">
                            Settings
                            </button>
                        </li>
                        <li className="mb-2">
                            <button onClick={logout} className="w-full text-left px-2 py-1 hover:bg-gray-700 rounded">
                            Sign Out
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )

}

export {AccountSideBar}
export type {SideBarProps}