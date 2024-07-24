import Image from '../../components/core/Image'
import Heading from '../../components/core/Heading'
import Button from '../../components/core/Button'
import Text from '../../components/core/Text'
import Time from '../../components/core/Time'
import View from '../../components/library/View'
import Confirm from './Confirm'
import logic from '../../logic'

import { useState } from 'react'

function Post({ post, onPostDeleted, onPostLikeToggled }) {
    console.log('Post -> render')

    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false)

    const handleDeletePost = () => setConfirmDeleteVisible(true)

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

    const handleDeletePostAccepted = () => {
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

    const handleDeletePostCancelled = () => setConfirmDeleteVisible(false)

    return <View tag="article" align="">
        <View direction='center'>
        <div className='AuthorPost'><Text>{post.author.username}</Text></div>
        </View>
        
        <View direction='center'>
        <div className='TitlePost'><Heading level="3">{post.title}</Heading>
        </div></View>

        <div className='ContainerImg'><Image src={post.image} /></div>

        <div className='Description'><Text>{post.description}</Text></div>
        
        <View direction='center'>
            <Button onClick={handleToggleLikePost}>{`${post.likes.includes(logic.getUserId()) ? '😍' : '🤍'} ${post.likes.length} laic${post.likes.length === 1 ? '' : 's'}`}</Button>
        </View>

        <View direction='center'>
            <Time>{post.date}</Time>

            {post.author.id === logic.getUserId() && <Button onClick={handleDeletePost}>🗑️</Button>}
        </View>
        {confirmDeleteVisible && <Confirm message="Delete post?" onAccept={handleDeletePostAccepted} onCancel={handleDeletePostCancelled} />}
        </View>
}

export default Post