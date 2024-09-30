import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

import Button from '../../../components/core/Button/Button';

import logic from '../../../logic';

import useContext from '../../../useContext';
import Confirm from '../Confirm/Confirm';

import './Ad.css';

export const Ad = ({ ad, onAdDeleted }) => {
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

    const { alert } = useContext();

    const navigate = useNavigate();

    const handleDeleteAd = (event) => {
        event.stopPropagation();
        setConfirmDeleteVisible(true);
    };
    const handleConfirmDelete = (event) => {
        event.stopPropagation();
        setConfirmDeleteVisible(false);
        try {
            logic
                .deleteAd(ad._id)
                .then(() => {
                    onAdDeleted();
                })
                .catch((error) => {
                    alert(error.message);
                });
        } catch (error) {
            alert(error.message);
        }
    };

    const handleCancelDelete = (event) => {
        event.stopPropagation();

        setConfirmDeleteVisible(false);
    };
    const handleUpdateAd = (event) => {
        event.stopPropagation();
        navigate(`/updateadform/${ad._id}`);
    };

    return (
        <>
            <div className="AdActions">
                <Button
                    className="DeleteAdButton"
                    type="button"
                    onClick={handleDeleteAd}
                >
                    Delete
                </Button>

                <button
                    className="UpdateAdButton"
                    type="button"
                    onClick={handleUpdateAd}
                >
                    Update
                </button>
            </div>

            {confirmDeleteVisible && (
                <Confirm
                    message="Are you sure you want to delete this ad?"
                    onAccept={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </>
    );
};
