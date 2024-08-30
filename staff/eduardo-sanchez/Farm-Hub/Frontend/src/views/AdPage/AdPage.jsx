import { useEffect, useState } from 'react';

import { useNavigate, useParams, useLocation } from 'react-router-dom';
import logic from '../../logic';
import Title from '../../components/core/Title';

import CreateComment from '../components/CreateCommnet/CreateComment';
import DeleteAdComment from '../components/DeleteAdComment/DeleteAdComment';

import backArrow from '../../icons/backArrow.png';

import './AdPage.css';

function AdPage() {
    const navigate = useNavigate()

    // const location = useLocation();

    const [ad, setAd] = useState(null)

    const { adId } = useParams()

    useEffect(() => {

        loadAd()
    }, [])

    // const handleGoBack = () => {
    //     const searchParams = new URLSearchParams(location.state?.search || '');
    //     const searchQuery = searchParams.get('q');
    //     if (searchQuery) {
    //         navigate(`/?q=${encodeURIComponent(searchQuery)}`);
    //     } else {
    //         navigate('/');
    //     }
    // };

    const loadAd = () => {
        logic.getAd(adId)
            .then(ad => {
                setAd(ad)
                console.log(ad)
            })

            .catch(error => console.error(error.message))
    }
    if (ad === null) {

        // return <h1>Loading...</h1>
        return <h1 className="AdPageLoading">Loading...</h1>;
    }

    const handleAdCommentSubmit = () => loadAd()

    return (
        <div className="AdPageContainer">
            <img src={backArrow} alt="Go back" onClick={() => navigate(-1)} className="AdPageBackButton" />
            {/* onClick={handleGoBack} */}
            <Title className="AdPageTitle">{ad?.title}</Title>
            <div className="AdPageDetails">
                <p className="AdPageAuthor">Posted by: {ad?.author.username}</p>
                <p className="AdPageDescription">{ad?.description}</p>
                <p className="AdPagePrice">Price: ${ad?.price}</p>
                <p className="AdPageDate">Posted on: {new Date(ad?.date).toLocaleDateString()}</p>
            </div>

            <div className="AdPageCommentsSection">
                <h2 className="AdPageCommentsTitle">Comments</h2>
                <CreateComment adId={adId} onAdCommentSubmitted={handleAdCommentSubmit} />

                <div className="AdPageCommentsList">
                    {ad.adcomments.map(comment => (
                        <div key={comment._id} className="AdPageComment">
                            <p className="AdPageCommentText">{comment.comment}</p>
                            <div className="AdPageCommentFooter">
                                <span className="AdPageCommentAuthor">{comment.author.username}</span>
                                {comment.author._id === sessionStorage.userId &&
                                    <DeleteAdComment
                                        adId={adId}
                                        commentId={comment._id}
                                        onAdCommentSubmitted={handleAdCommentSubmit}
                                    />
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );

}

export default AdPage