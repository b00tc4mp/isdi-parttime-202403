import { useState } from 'react';

import logic from '../../../logic';

function CreateComment({ adId }) {
    // const [data, setData] = useState('')

    const handleSubmit = (event) => {

        event.preventDefault()

        const form = event.target
        const comment = form.comment.value

        logic.createAdComment(adId, comment)
            .then(() => {
                console.log('Comment created')
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name='comment' placeholder='Comment' />
            <button>Comment</button>
        </form>
    )

}

export default CreateComment