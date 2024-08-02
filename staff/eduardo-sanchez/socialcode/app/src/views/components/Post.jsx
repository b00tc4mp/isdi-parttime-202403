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


    // const handleDeletePost = () => {
    //     if (confirm('Delete post?'))
    //         try {
    //             logic.deletePost(post.id)
    //                 .then(() => onPostDeleted())
    //                 .catch(error => {
    //                     console.error(error)

    //                     alert(error.message)
    //                 })
    //         } catch (error) {
    //             console.error(error)

    //             alert(error.message)
    //         }
    // }

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

    const handleDeletePostAccept = () => {
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

    const handleDeletePostCancel = () => setConfirmDeleteVisible(false)


    return <View className="Post" tag="article" align="">
        <View className="Post-Header">
            <Text className="Author">{post.author.username}</Text>

            <Heading level="2">{post.title}</Heading>
        </View>

        <div className='Image-Container'><Image src={post.image} /></div>

        <Text className="Post-Description">{post.description}</Text>

        <View direction='row'>
            <Button onClick={handleToggleLikePost}>{`${post.likes.includes(logic.getUserId()) ? '❤️' : '🤍'} ${post.likes.length} like${post.likes.length === 1 ? '' : 's'}`}</Button>
        </View>

        <View className="Date">
            <Time>{post.date}</Time>

            {post.author.id === logic.getUserId() && <Button onClick={handleDeletePost}>Delete</Button>}
        </View>
        {confirmDeleteVisible && <Confirm message="Delete this post?" onAccept={handleDeletePostAccept} onCancel={handleDeletePostCancel} />}

    </View >
}

export default Post