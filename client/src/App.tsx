import './App.css'

// @ts-ignore
import type { RootState, AppDispatch } from './redux_store/store';

import AppRoutes from "@/services/route_service.tsx";
function App() {

    return (
        <>

            <AppRoutes />

        </>
    )
}

export default App
