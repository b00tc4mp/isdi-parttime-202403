import { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom'

import logic from '../../../logic';

import Button from '../../../components/core/Button'

import './DeleteAdComment.css'

function DeleteAdComment({ adId, onAdCommentSubmitted, commentId }) {
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    const handleDeleteAdComment = () => {

        try {

            logic.deleteAdComment(adId, commentId)
                .then(() => {
                    console.log('Comment deleted')
                    onAdCommentSubmitted()

                })
                .catch((error) => {
                    console.error(error)
                    setMessage(error.message)
                })

        } catch (error) {
            setMessage(error.message)
            console.error(error)
        }
    }


    return (
        <>
            <Button className="DeleteAdCommentButton" onClick={handleDeleteAdComment} type="button">Delete</Button>

            {message && <p className="ErrorMessage">{message}</p>}
        </>
    )

}

export default DeleteAdComment