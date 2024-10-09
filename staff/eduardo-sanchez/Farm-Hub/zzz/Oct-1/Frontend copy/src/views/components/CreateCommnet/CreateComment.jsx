import { useState } from 'react';

import logic from '../../../logic';

import useContext from '../../../useContext';

import Button from '../../../components/core/Button/Button';

import './CreateComment.css';

function CreateComment({ adId, onAdCommentSubmitted }) {
    const [message, setMessage] = useState('');

    const { alert } = useContext();

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const comment = form.comment.value;

        try {
            logic
                .createAdComment(adId, comment)
                .then(() => {
                    onAdCommentSubmitted();
                    form.reset();
                })
                .catch((error) => {
                    alert(error.message);
                });
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <form className="CreateCommentForm" onSubmit={handleSubmit}>
            <input
                className="CreateCommentInput"
                type="text"
                name="comment"
                placeholder="Comment"
            />

            <div className="CreateCommentButtons">
                <Button className="CreateCommentButton" type="submit">
                    Comment
                </Button>
            </div>
            {message && <p className="ErrorMessage">{message}</p>}
        </form>
    );
}

export default CreateComment;
