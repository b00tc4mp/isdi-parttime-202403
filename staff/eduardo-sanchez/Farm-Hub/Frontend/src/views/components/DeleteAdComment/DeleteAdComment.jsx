import { useState } from 'react';
import logic from '../../../logic';
import Button from '../../../components/core/Button/Button';
import Confirm from '../Confirm/Confirm';
import useContext from '../../../useContext';
import './DeleteAdComment.css';

function DeleteAdComment({ adId, onCommentDeleted, commentId }) {
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
    const { alert } = useContext();

    const handleDeleteAdComment = (event) => {
        event.stopPropagation();
        setConfirmDeleteVisible(true);
    };

    const handleConfirmDeleteAdComment = (event) => {
        event.stopPropagation();
        setConfirmDeleteVisible(false);
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
    };

    const handleCancelDeleteAdComment = (event) => {
        event.stopPropagation();
        setConfirmDeleteVisible(false);
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
            {confirmDeleteVisible && (
                <Confirm
                    message="Are you sure you want to delete this comment?"
                    onAccept={handleConfirmDeleteAdComment}
                    onCancel={handleCancelDeleteAdComment}
                />
            )}
        </>
    );
}

export default DeleteAdComment;
