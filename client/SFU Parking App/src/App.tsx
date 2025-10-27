import {useEffect, useState} from 'react'
import './App.css'

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(
        ()=>{

            if (localStorage.getItem("cookies_enabled")){
                setIsLoggedIn(true)
            }

        }, []
    )

    return (
        <>

            <p> Hello, World! </p>
        </>
    )
}

export default App
