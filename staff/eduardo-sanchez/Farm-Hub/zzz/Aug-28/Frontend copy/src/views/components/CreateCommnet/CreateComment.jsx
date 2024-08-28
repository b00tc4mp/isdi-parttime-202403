import { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom'

import logic from '../../../logic';

import Button from '../../../components/core/Button'

import './CreateComment.css'

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
        <form className='CreateCommentform' onSubmit={handleSubmit}>
            <input className='CreateCommentInput' type="text" name='comment' placeholder='Comment' />

            <div className='CreateCommentButtons'>
                <Button className='CreateCommentButton' type="submit" >Comment</Button>
                <Link className="CancelCommentLink" to={'/'}>Cancel</Link>
            </div>
            {message && <p className="ErrorMessage">{message}</p>}
        </form>
    )

}

export default CreateComment