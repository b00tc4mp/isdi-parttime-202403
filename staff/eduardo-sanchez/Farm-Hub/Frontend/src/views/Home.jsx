import { Link, useNavigate } from "react-router-dom"
import Title from "../components/core/Title"

import Button from "../components/core/Button"

import logic from "../logic"
import { useEffect, useState } from "react"

import AdList from "./components/AdList/AdList"


import './Home.css'
function Home() {

    const navigate = useNavigate

    return <>

        <Title>Farm-Hub</Title>

        <div>
            <AdList />

        </div>

        <div>
            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>

        </div>
    </>
}

export default Home