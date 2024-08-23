import { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom'

import logic from '../../../logic';

import Button from '../../../components/core/Button'

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
        <Button className="deleteAdCommentButton" onClick={handleDeleteAdComment}>Delete</Button>
    )

}

export default DeleteAdComment