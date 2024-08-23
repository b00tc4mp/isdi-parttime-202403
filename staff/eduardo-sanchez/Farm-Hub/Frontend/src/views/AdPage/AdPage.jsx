import { useEffect, useState } from 'react';

import { useNavigate, useParams, Link } from 'react-router-dom';
import logic from '../../logic';
import Title from '../../components/core/Title';
// import Button from '../../components/core/Button';
// import Link from '../components/core/Link';
import CreateComment from '../components/CreateCommnet/CreateComment';
import DeleteAdComment from '../components/DeleteAdComment/DeleteAdComment';


function AdPage() {
    // const navigate = useNavigate()

    const [ad, setAd] = useState(null)

    const { adId } = useParams()

    useEffect(() => {

        loadAd()
    }, [])

    const loadAd = () => {
        logic.getAd(adId)
            .then(ad => {
                setAd(ad)
                console.log(ad)
            })

            .catch(error => console.error(error.message))
    }
    if (ad === null) {

        return <h1>Loading...</h1>
    }

    const handleAdCommentSubmit = () => loadAd()

    return (
        <div>

            <Title>{ad?.title}</Title>
            <p>{ad?.author.username}</p>
            <p>{ad?.description}</p>
            <p>{ad?.price}</p>
            <p>{ad?.date}</p>

            <CreateComment adId={adId} onAdCommentSubmitted={handleAdCommentSubmit} />
            {ad.adcomments.map(comment => {

                return <div key={comment._id}>
                    <p>{comment.comment}</p>
                    <p></p>
                    <span>{comment.author.username}</span>
                    {comment.author._id === sessionStorage.userId && <DeleteAdComment adId={adId} commentId={comment._id} onAdCommentSubmitted={handleAdCommentSubmit} />}
                </div>
            }
            )}


        </div>

    )

}

export default AdPage




//     < CreateComment adId = { adId } onAdCommentSubmitted = { loadAd } />
