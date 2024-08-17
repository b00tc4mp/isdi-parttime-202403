import { useEffect, useState } from 'react'
import logic from '../../../logic'

import './AdList.css'
import { Ad } from '../Ad/Ad'

function AdList({ refreshStamp }) {
    const [ads, setAds] = useState([])




    useEffect(() => {


        loadAds()
    }, [refreshStamp])


    const loadAds = () => {
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
    }



    const handleAdDeleted = () => loadAds()

    return (
        <>
            <ul>
                {ads.map((ad) =>
                    <li key={ad.id} className='AdContainer'>
                        <p>{ad.author.username}</p>
                        <p>{ad.title}</p>
                        <p>{ad.description}</p>
                        <p>{ad.price}</p>
                        <p>{ad.date}</p>

                        <Ad ad={ad} onAdDeleted={handleAdDeleted} />
                    </li >
                )}
            </ul>
        </>
    )
}
export default AdList
