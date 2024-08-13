import { Link } from "react-router-dom"
import Title from "../components/core/Title"

import Button from "../components/core/Button"

import logic from "../logic"
import { useEffect, useState } from "react"
import AdList from "./components/AdList/AdList"

function Home() {


    return <>

        <Title>Farm-Hub</Title>

        <AdList></AdList>


    </>
}

export default Home