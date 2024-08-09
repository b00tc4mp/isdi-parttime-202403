import { Link } from "react-router-dom"
import Title from "../components/core/Title"

import Button from "../components/core/Button"

import logic from "../logic"
import { useEffect, useState } from "react"
import Ad from "./components/Ad"

function Home() {


    return <>

        <Title>Farm-Hub</Title>

        <Ad></Ad>

    </>
}

export default Home