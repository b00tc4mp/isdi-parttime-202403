import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import logic from '../logic';
import Title from '../components/core/Title/Title';

import CreateComment from './components/CreateCommnet/CreateComment';
import DeleteAdComment from './components/DeleteAdComment/DeleteAdComment';

import backArrow from '../icons/backArrow.png';

import useContext from '../useContext';

import { MapComponent } from './components/Map/Map';

import './AdPage.css';

function AdPage() {
    const navigate = useNavigate();

    const [ad, setAd] = useState(null);

    const { adId } = useParams();

    const { alert } = useContext();

    useEffect(() => {
        loadAd();
    }, []);

    const loadAd = () => {
        try {
            logic
                .getAd(adId)
                .then((ad) => {
                    setAd(ad);
                    console.log(ad);
                })

                .catch((error) => {
                    console.error(error.message);

                    alert(error.message);
                });
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    };
    if (ad === null) {
        return <h1 className="AdPageLoading">Loading...</h1>;
    }

    const handleAdCommentSubmit = () => loadAd();

    return (
        <div className="AdPageContainer">
            <img
                src={backArrow}
                alt="Go back"
                onClick={() => navigate(-1)}
                className="AdPageBackButton"
            />
            <Title className="AdPageTitle">{ad.title}</Title>
            <div className="AdPageDetails">
                <p className="AdPageAuthor">Posted by: {ad?.author.username}</p>
                <p className="AdPageDescription">{ad?.description}</p>
                <p className="AdPagePrice">Price: ${ad?.price}</p>
                <p className="AdPageDate">
                    Posted on: {new Date(ad?.date).toLocaleDateString()}
                </p>
                <p className="AdPageContactInfo">
                    Contact Info: {ad?.contactInfo}
                </p>
            </div>

            {ad.geoLocation && (
                <>
                    <div>
                        <MapComponent
                            geolocation={ad.geoLocation}
                        ></MapComponent>
                    </div>
                </>
            )}

            <div className="AdPageCommentsSection">
                <h2 className="AdPageCommentsTitle">Comments</h2>
                <CreateComment
                    adId={adId}
                    onAdCommentSubmitted={handleAdCommentSubmit}
                />

                <div className="AdPageCommentsList">
                    {ad.adcomments.map((comment) => (
                        <div key={comment._id} className="AdPageComment">
                            <p className="AdPageCommentText">
                                {comment.comment}
                            </p>
                            <div className="AdPageCommentFooter">
                                <span className="AdPageCommentAuthor">
                                    {comment.author.username}
                                </span>
                                {comment.author._id ===
                                    sessionStorage.userId && (
                                    <DeleteAdComment
                                        adId={adId}
                                        commentId={comment._id}
                                        onCommentDeleted={handleAdCommentSubmit}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdPage;
