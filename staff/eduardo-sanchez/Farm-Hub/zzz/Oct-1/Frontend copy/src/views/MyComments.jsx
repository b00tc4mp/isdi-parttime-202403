import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../components/core/Title/Title';

import { SystemError } from 'com/errors';
import logic from '../logic';

import useContext from '../useContext';

import backArrow from '../icons/backArrow.png';

import './MyComments.css';

export const MyComments = () => {
    const [userComments, setUserComments] = useState([]);

    const navigate = useNavigate();

    const { alert } = useContext();

    useEffect(() => {
        loadUserComments();
    }, []);

    const loadUserComments = () => {
        try {
            logic
                .getUserComments()
                .then((comments) => {
                    setUserComments(comments);
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
                My Comments
            </Title>

            <img
                className="absolute left-3 top-3 w-11 bg-transparent cursor-pointer text-black font-bold"
                src={backArrow}
                alt="Go back"
                onClick={() => navigate(-1)}
            />

            {!userComments ||
                (userComments.length === 0 && (
                    <p className="UserCommentsListEmpty">
                        There are no comments found
                    </p>
                ))}

            <ul className="UserCommentsList">
                {userComments.map((comment) => (
                    <li key={comment._id} className="UserCommentsContainer">
                        <h3 className="UserCommentsTitle">{comment.title}</h3>
                        <button
                            className="left-3 right-8 underline text-orange-700"
                            onClick={() => handleGoToAd(comment._id)}
                        >
                            Go to Ad
                        </button>

                        <div className="UserCommentsContent">
                            Your Comment/s:{''}
                            {comment.adcomments &&
                                comment.adcomments.length > 0 &&
                                comment.adcomments.map((_comment) => (
                                    <p
                                        key={_comment._id}
                                        className="UserCommentText"
                                    >
                                        {' '}
                                        {_comment.comment}
                                    </p>
                                ))}
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};
