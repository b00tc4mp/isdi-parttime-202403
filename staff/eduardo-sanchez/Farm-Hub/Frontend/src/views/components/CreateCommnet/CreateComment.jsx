import { useState } from 'react';

import logic from '../../../logic';

import Button from '../../../components/core/Button'

import './CreateComment.css'

function CreateComment({ adId, onAdCommentSubmitted }) {
    const [message, setMessage] = useState('')

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
                    alert(error.message)
                    setMessage(error.message)
                })

        } catch (error) {
            console.error(error)
            alert(error.message)
            setMessage(error.message)
        }
    }

    return (
        <form className='CreateCommentForm' onSubmit={handleSubmit} >
            <input className='CreateCommentInput' type="text" name='comment' placeholder='Comment' />

            <div className='CreateCommentButtons'>
                <Button className='CreateCommentButton' type="submit" >Comment</Button>
                {/* <Link className="CancelCommentLink" to={'/'}>Cancel</Link> */}
            </div>
            {message && <p className="ErrorMessage">{message}</p>}
        </form>
    )
}

export default CreateComment