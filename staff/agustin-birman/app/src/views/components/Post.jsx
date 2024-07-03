import './Post.css'

import logic from '../../logic'

import Time from '../../components/core/Time'
import Text from '../../components/core/Text'
import Image from '../../components/core/Image'
import Heading from '../../components/core/Heading'
import Button from '../../components/core/Button'
import ConfirmDelete from '../../components/core/ConfirmDelete'
import CreateCommentPost from './CreateCommentPost'
import { useState } from 'react'

function Post({ post, onPostDeleted, onPostLikeToggled, onCommentPostSubmit }) {
    const [showConfirm, setShowConfirm] = useState('')
    const [showAddComment, setShowAddComment] = useState('')

    const handleCommentPostSubmit = () => onCommentPostSubmit()

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

    const handleToggleLikePost = () => {
        try {
            logic.toggleLikePost(post.id, error => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                onPostLikeToggled()
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleShowConfirmDelete = () => setShowConfirm('show')

    const handleCancelConfirmDelete = () => setShowConfirm('')

    const handleShowAddComment = () => setShowAddComment('show')

    const handleCancelAddComment = () => setShowAddComment('')

    return <article className='Post'>
        <div className='PostHeader'>
            <Heading className='Title' level='2'>{post.title}</Heading>

            <Button onClick={handleToggleLikePost}>{`${post.likes.includes(logic.getUserId()) ? '❤️' : '🤍'} ${post.likes.length} like${post.likes.length === 1 ? '' : 's'}`}</Button>

            {post.author.id === logic.getUserId() && <Button onClick={handleShowConfirmDelete}>Delete</Button>}

            <Button onClick={handleShowAddComment}>Comment</Button>
        </div>

        <Image src={post.image} />

        <Text className='Description'>{post.description}</Text>

        <div className='PostFooter'>
            <Time>{post.date}</Time>
            <Text className='Author'>{post.author.username}</Text>
        </div>

        {showConfirm === 'show' && <ConfirmDelete onCancelConfirm={handleCancelConfirmDelete} onConfirmDelete={() => handleDeletePost(post.id)} />}

        {showAddComment === 'show' && <CreateCommentPost onCancelCommentPost={handleCancelAddComment} postID={post.id} onCommentPostSubmit={handleCommentPostSubmit}></CreateCommentPost>}

    </article>
}

export default Post