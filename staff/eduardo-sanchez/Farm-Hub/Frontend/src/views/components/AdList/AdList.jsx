import { useEffect, useState } from 'react'
import logic from '../../../logic'

import './AdList.css'
import { Ad } from '../Ad/Ad'

function AdList({ refreshStamp }) {
    const [ads, setAds] = useState([])

    const [user, setUser] = useState('')


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

    useEffect(() => {
        console.log('Home -> useEffect')

        try {
            logic.getUserInfo()
                .then(user => {
                    console.log('Home -> setUsername')

                    setUser(user)
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message + " " + "HELL")
                })

        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    const handleAdDeleted = () => loadAds()

    return (
        <>
            <h1>{user.username}</h1>
            <ul>
                {ads.map((ad) =>
                    <li key={ad.id} className='AdContainer'>
                        <p>{ad.author.username}</p>
                        <p>{ad.title}</p>
                        <p>{ad.description}</p>
                        <p>{ad.price}</p>

                        <Ad ad={ad} onAdDeleted={handleAdDeleted} />
                    </li >
                )}
            </ul>
        </>
    )
}
export default AdList
