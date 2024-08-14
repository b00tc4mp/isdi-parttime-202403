import { Link } from "react-router-dom"
import Title from "../components/core/Title"

import Button from "../components/core/Button"

import logic from "../logic"
import { useEffect, useState } from "react"


import './Home.css'
function Home() {


    return <>

        <Title>Farm-Hub</Title>

        <div>
            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>

        </div>
    </>
}

export default Home