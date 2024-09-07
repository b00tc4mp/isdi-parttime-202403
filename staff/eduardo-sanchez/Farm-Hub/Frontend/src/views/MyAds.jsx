/*
En backend un nuevo endpoint que recupere los anuncios del usuario logeado de mongo
desde front crear la logica del servicio para hacer fetch a back y manejar errores
*/

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Title from "../components/core/Title"
import logic from "../logic"

export const MyAds = () => {

    const [userAds, setUserAds] = useState([])

    const { userId } = useParams();

    useEffect(() => {
        console.log("MyAds -> useEffect");
        loadUserAds();
    }, []);

    //useEffect(() => {
    //    console.log("MyAds -> useEffect");
    //    //if (userId) {
    //    console.log('From MyAds: ', userId)
    //    loadUserAds();
    //    //} else {
    //    //  console.error('No userId found');
    //    //}
    //}, [userId]);

    const loadUserAds = () => {
        console.log('Param: ', JSON.stringify(userId, null, 2))
        try {
            logic.getUserAds()
                .then((userAds) => {
                    setUserAds(userAds)
                    console.log(userAds)
                });
        } catch (error) {
            console.error(error.message);
            alert(error.message);
        }
    }

    const handleLoadUserAds = () => {
        loadUserAds();
    }

    return (
        <>
            <Title>My Ads</Title>
            <button onClick={handleLoadUserAds}>Load User Ads</button>
            <ul>
                {userAds.map((userAd) => (
                    <li key={userAd._id}>
                        {userAd.title}
                    </li>
                ))}
            </ul>
        </>
    )
}