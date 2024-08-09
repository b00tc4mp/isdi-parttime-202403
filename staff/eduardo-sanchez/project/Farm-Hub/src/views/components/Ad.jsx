import { useEffect, useState } from 'react'
import logic from '../../logic'

import './Ad.css'

function Ad({ }) {
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

    console.log(ads)

    return (
        <>
            <ul>
                {ads.map((ad) =>
                    <li key={ad.id} className='AdContainer'>
                        <p>{ad.author.username}</p>
                        <p>{ad.title}</p>
                        <p>{ad.description}</p>
                        <p>{ad.price}</p>
                    </li>)
                }
            </ul>

        </>

    )
}
export default Ad