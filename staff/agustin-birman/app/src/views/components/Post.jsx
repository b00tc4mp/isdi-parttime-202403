import './Post.css'

import logic from '../../logic'

import Time from '../../components/core/Time'
import Text from '../../components/core/Text'
import Image from '../../components/core/Image'
import Heading from '../../components/core/Heading'
import Button from '../../components/core/Button'
import ConfirmDelete from '../../components/core/ConfirmDelete'
import { useState } from 'react'

function Post({ post, onPostDeleted }) {
    const [showConfirm, setShowConfirm] = useState('')

    const handleDeletePost = () => {
        try {
            logic.deletePost(post.id, error => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                onPostDeleted()
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleShowConfirmDelete = () => setShowConfirm('show')

    const handleCancelConfirmDelete = () => setShowConfirm('')

    return <article className='Post'>
        <div className='PostHeader'>
            <Heading className='Title' level='2'>{post.title}</Heading>
            {post.author === logic.getUserUsername() && <Button onClick={handleShowConfirmDelete}>Delete</Button>}
        </div>

        <Image src={post.image} />

        <Text className='Description'>{post.description}</Text>

        <div className='PostFooter'>
            <Time>{post.date}</Time>
            <Text className='Author'>{post.author}</Text>
        </div>
        {showConfirm === 'show' && <ConfirmDelete onCancelConfirm={handleCancelConfirmDelete} onConfirmDelete={() => handleDeletePost(post.id)} />}

    </article>
}

export default Post