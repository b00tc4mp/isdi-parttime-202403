/*
En backend un nuevo endpoint que recupere los anuncios del usuario logeado de mongo
desde front crear la logica del servicio para hacer fetch a back y manejar errores
*/

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Title from "../components/core/Title"

import { SystemError } from "com/errors"
import logic from "../logic"

import './MyAds.css'

export const MyAds = () => {

    const [userAds, setUserAds] = useState([])

    useEffect(() => {
        console.log("MyAds -> useEffect");
        loadUserAds();
    }, []);

    // if (!userAds) {
    //     return <p>No ads Found</p>
    // }

    const loadUserAds = () => {

        try {
            logic.getUserAds()
                .then((userAds) => {
                    setUserAds(userAds)
                    console.log(userAds)
                })
                .catch((error) => {
                    if (error instanceof SystemError) {
                        console.log(error.message)
                        alert(error.message)
                    }
                })
        } catch (error) {
            console.error(error.message);
            alert(error.message);
        }
    }

    // if (!userAds || userAds.length === 0) {
    //     return <p className="UserAdListEmpty">There are no ads found</p>;
    // }

    // const handleLoadUserAds = () => {
    //     loadUserAds();
    // }

    return (
        <>
            <Title>My Ads</Title>

            {!userAds || userAds.length === 0 && (
                <p className="UserAdListEmpty">There are no ads found</p>)}

            {/* <button onClick={handleLoadUserAds}></button> */}
            <ul>
                {userAds.map((userAd) => (
                    <li key={userAd._id} className="UserAdsContainer">
                        <h3>{userAd.title}</h3>
                        <p>                {userAd.description}
                        </p>
                        <h2>                 {userAd.price}
                        </h2>
                        <p>Posted on:    {new Date(userAd.date).toLocaleDateString()}
                        </p>
                    </li>
                ))}
            </ul>
        </>
    )
}