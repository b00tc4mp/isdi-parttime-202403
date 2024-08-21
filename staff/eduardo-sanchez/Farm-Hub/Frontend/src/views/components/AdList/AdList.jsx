import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logic from '../../../logic'

import './AdList.css'
import { Ad } from '../Ad/Ad'
import { Time } from '../../../components/core/Time/Time'

function AdList({ refreshStamp }) {
    const [ads, setAds] = useState([])

    const navigate = useNavigate()


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
                    <li key={ad.id} className='AdContainer' onClick={() => navigate(`/adpage/${ad.id}`)}>
                        <p>{ad.author.username}</p>
                        <p>{ad.title}</p>
                        <p>{ad.description}</p>
                        <p>{ad.price}</p>

                        <p>{Time(ad.date)}</p>

                        <Ad ad={ad} onAdDeleted={handleAdDeleted} />
                    </li >
                )}
            </ul>
        </>
    )
}
export default AdList
