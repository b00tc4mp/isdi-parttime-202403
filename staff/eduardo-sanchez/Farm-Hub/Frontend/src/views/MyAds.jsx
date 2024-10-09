import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../components/core/Title/Title';

import { SystemError } from 'com/errors';
import logic from '../logic';

import useContext from '../useContext';

import backArrow from '../icons/backArrow.png';

import './MyAds.css';

export const MyAds = () => {
    const [userAds, setUserAds] = useState([]);

    const navigate = useNavigate();

    const { alert } = useContext();

    useEffect(() => {
        loadUserAds();
    }, []);

    const loadUserAds = () => {
        try {
            logic
                .getUserAds()
                .then((userAds) => {
                    setUserAds(userAds);
                })
                .catch((error) => {
                    if (error instanceof SystemError) {
                        alert(error.message);
                    }
                });
        } catch (error) {
            alert(error.message);
        }
    };

    const handleGoToAd = (adId) => {
        navigate(`/adpage/${adId}`);
    };

    return (
        <>
            <Title className="text-center text-2xl text-black mt-3 mb-1 p-1 underline">
                My Ads
            </Title>

            <img
                className="absolute left-3 top-3 w-11 bg-transparent cursor-pointer text-black font-bold"
                src={backArrow}
                alt="Go back"
                onClick={() => navigate(-1)}
            />

            {!userAds ||
                (userAds.length === 0 && (
                    <p className="UserAdListEmpty">There are no ads found</p>
                ))}

            <ul>
                {userAds.map((userAd) => (
                    <li
                        key={userAd._id}
                        className="UserAdsContainer"
                        onClick={() => handleGoToAd(userAd._id)}
                    >
                        <h3>{userAd.title}</h3>
                        <p> {userAd.description}</p>
                        <h2> {userAd.price}</h2>
                        <p>
                            Posted on:{' '}
                            {new Date(userAd.date).toLocaleDateString()}
                        </p>
                        <div className="AdCommentsContainer">
                            <h4>Comments ({userAd.adcomments.length}):</h4>
                            <ul>
                                {userAd.adcomments.map((comment, index) => (
                                    <li key={index} className="AdComment">
                                        <p>
                                            <strong>
                                                {comment.author.username}:
                                            </strong>{' '}
                                            {comment.comment}
                                        </p>
                                        <small>
                                            {new Date(
                                                comment.date
                                            ).toLocaleString()}
                                        </small>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};
