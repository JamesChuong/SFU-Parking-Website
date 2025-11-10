import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../redux_store/store.ts";
import {remove_token} from "../redux_store/redux.ts";
import type {LogoutData} from "../auth/auth_query_functions.ts";
import {logoutUser} from "../auth/auth_query_functions.ts";


function AccountSideBar(){

    const dispatch: AppDispatch = useDispatch()
    const { refresh_token } = useSelector((state: RootState) => state.authentication);

    function logout(){

        try {

            const request: LogoutData = {

                refresh_token: refresh_token

            };

            logoutUser(request);

            dispatch(remove_token);

        }

        catch (err){
            console.log(err)
        }

    }

    return (
        <>
            <p> Text </p>
        </>
    )

}

export default AccountSideBar