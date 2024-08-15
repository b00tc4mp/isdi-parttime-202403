import { Link, useNavigate } from "react-router-dom"
import Title from "../components/core/Title"

import Button from "../components/core/Button"

import logic from "../logic"
import { useEffect, useState } from "react"


import './Home.css'
function Home() {

    const navigate = useNavigate

    const [username, setUsername] = useState('')

    useEffect(() => {
        console.log('Home -> useEffect')

        try {
            logic.getUserInfo()
                .then(username => {
                    console.log('Home -> setUsername')

                    setUsername(username)
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message + " " + "HELL")
                })

        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    return <>

        <Title>Farm-Hub</Title>

        <div>
            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>

        </div>
    </>
}

export default Home