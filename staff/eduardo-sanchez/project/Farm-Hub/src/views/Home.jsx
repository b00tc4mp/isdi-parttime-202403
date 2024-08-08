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
            {ads.length > 0 ? (
                ads.map((ad, index) => (
                    <div key={index}>
                        <h2><strong>Title:</strong>{ad.title}</h2>
                        <p><strong>Author:</strong> {ad.author.username}</p> {/* Mostrar el nombre del autor */}
                        <p><strong>Description:</strong> {ad.description}</p>
                        <p><strong>Price:</strong> {ad.price}</p>
                        <p><strong>Date:</strong> {ad.date}</p>
                        {/* Renderiza más propiedades del anuncio si es necesario */}
                    </div>
                ))
            ) : (
                <p>No ads available</p>
            )}
        </div>

    </>
}

export default Home