import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import logic from '../logic';
import Title from '../components/core/Title';
import CreateComment from './components/CreateCommnet/CreateComment';

function AdPage() {
    // const navigate = useNavigate()

    const [ad, setAd] = useState(null)

    const { adId } = useParams()

    useEffect(() => {

        loadAd()
    }, [])

    const loadAd = () => {
        logic.getAdId(adId)
            .then(ad => {
                setAd(ad)
                console.log(ad)
            })

            .catch(error => console.error(error.message))
    }
    if (ad === null) {

        return <h1>Loading...</h1>
    }
    return (
        <div>

            <Title>{ad?.title}</Title>
            <p>{ad?.author.username}</p>
            <p>{ad?.description}</p>
            <p>{ad?.price}</p>
            <p>{ad?.date}</p>

            <CreateComment adId={adId} />
            {ad.adcomments.map(comment => {

                return <div key={comment._id}>
                    <p>{comment.comment}</p>
                    <p></p>
                    <span>{comment.author.username}</span>
                </div>
            }
            )}

        </div>

    )

}

export default AdPage