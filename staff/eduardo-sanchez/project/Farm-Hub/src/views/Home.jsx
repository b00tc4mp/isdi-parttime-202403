import { Link } from "react-router-dom"
import Title from "../components/core/Title"

import Button from "../components/core/Button"

import logic from "../logic"
import { useEffect, useState } from "react"

function Home() {
    const [ads, setAds] = useState([])

    useEffect(() => {
        try {
            logic.getAllAds()
                .then((ads) => {
                    setAds(ads)
                })
                .catch((error) => {
                    alert(error.message)
                })
        } catch (error) {
            alert(error.message)
        }
    }, [])

    return <>

        <Title>Farm-Hub</Title>

        <div>
            {ads}
        </div>

    </>
}

export default Home