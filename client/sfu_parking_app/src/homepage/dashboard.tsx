import {NavigationBar} from "../components/navigation_bar.tsx";
import type {NavBarProps} from "../components/navigation_bar.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../redux_store/store.ts";

function Dashboard() {

    const { username } = useSelector((state: RootState) => state.authentication);

    return (

        <>
            <NavigationBar username={username}/>

            <p> Dashboard </p>

        </>

    )

}

export default Dashboard