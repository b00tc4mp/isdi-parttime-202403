import { useState } from 'react';

import { useNavigate } from 'react-router-dom'

import logic from '../../../logic';

import Button from '../../../components/core/Button'

function CreateComment({ adId, onAdCommentSubmitted }) {
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (event) => {

        event.preventDefault()

        const form = event.target
        const comment = form.comment.value

        try {

            logic.createAdComment(adId, comment)
                .then(() => {
                    console.log('Comment created')
                    onAdCommentSubmitted()
                    form.reset()
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
        <form onSubmit={handleSubmit}>
            <input type="text" name='comment' placeholder='Comment' />
            <Button type="submit">Comment</Button>
            {message && <p className="ErrorMessage">{message}</p>}
        </form>
    )

}

export default CreateComment