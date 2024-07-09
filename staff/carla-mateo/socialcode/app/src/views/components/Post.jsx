import { useEffect, useState } from 'react'
import Image from '../../components/core/Image'
import Heading from '../../components/core/Heading'
import Button from '../../components/core/Button'
import Text from '../../components/core/Text'
import Time from '../../components/core/Time'
import View from '../../components/library/View'
import CreatePostComment from './CreatePostComment'

import logic from '../../logic'


function Post({ post, onPostDeleted, onPostLikeToggled, onCreatePostComment }) {
    console.log('Post -> render')

    const [showAddComment, setShowAddComment] = useState(false)
    const [comments, setComments] = useState([])

    useEffect(() => {
        setComments(post.comments)
    }, [])

    const handleDeletePost = () => {
        if (confirm('Delete post?'))
            try {
                logic.deletePost(post.id)
                    .then(() => onPostDeleted())
                    .catch(error => {
                        console.error(error)

                        alert(error.message)
                    })

            } catch (error) {
                console.error(error)

                alert(error.message)
            }
    }

    const handleToggleLikePost = () => {
        try {
            logic.toggleLikePost(post.id)
                .then(() => onPostLikeToggled())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleShowComment = () => {
        setShowAddComment(!showAddComment)
    }

    return <View tag="article" aling="">
        <View direction="row">
            <Text>{post.author.username}</Text>

            <Heading level="2">{post.title}</Heading>
        </View>

        <Image src={post.image} />

        <Text>{post.description}</Text>

        <View direction='row'>
            <Button onClick={handleToggleLikePost}>{`${post.likes.includes(logic.getUserId()) ? '❤️' : '🤍'} ${post.likes.length} like${post.likes.length === 1 ? '' : 's'}`}</Button>
        </View>

        <View direction="row">
            <Time>{post.date}</Time>

            <Button onClick={handleShowComment}>mostrar comment</Button>

            {showAddComment && (
                <CreatePostComment
                    postId={post.id}
                />
            )}

            {post.author.id === logic.getUserId() && <Button onClick={handleDeletePost}>Delete</Button>}
        </View>
    </View>
}

export default Post