import { useState } from 'react';
import logic from '../../../logic';
import Button from '../../../components/core/Button/Button';
import useContext from '../../../useContext';
import './DeleteAdComment.css';

function DeleteAdComment({ adId, onCommentDeleted, commentId }) {
    const [message, setMessage] = useState('');

    const { alert } = useContext();

    const handleDeleteAdComment = (event) => {
        if (confirm('Are you sure you want to delete this comment?')) {
            try {
                logic
                    .deleteAdComment(adId, commentId)
                    .then(() => {
                        onCommentDeleted();
                    })
                    .catch((error) => {
                        alert(error.message);
                    });
            } catch (error) {
                alert(error.message);
            }
        }
    };

    return (
        <>
            <Button
                className="DeleteAdCommentButton"
                onClick={handleDeleteAdComment}
                type="button"
            >
                Delete
            </Button>
            {message && <p className="ErrorMessage">{message}</p>}
        </>
    );
}

export default DeleteAdComment;
