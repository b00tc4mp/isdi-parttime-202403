import './Post.css'

import Image from '../../../Components/Core/Image'
import Heading from '../../../Components/Core/Heading'
import Button from '../../../Components/Core/Button'
import Text from '../../../Components/Core/Text'
import Time from '../../../Components/Core/Time'
import View from '../../../Components/Library/View'
import CommentPostForm from './CommentPostForm'
import CommentList from './commentList'

import logic from '../../../logic'

function Post({ post, onPostDeleted, onPostLikeToggled, onPostCommented }) {
    console.log('Post -> render')
    
    const handleDeletePost = () => {
        if (confirm('Delete post?'))
            try {
                logic.deletePost(post._id, error => {
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
            logic.toggleLikePost(post._id, error => {
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

    return <View tag="article" align="" className={'post'}>
        <View direction='row' className={'header'}>
            <Text>{post.author.username}</Text>

            <Heading level="2">{post.title}</Heading>
        </View>

        <Image src={post.image} />

        <Text>{post.description}</Text>

        <View direction='row' className={'likesAndComments '}>
            <Button onClick={handleToggleLikePost}>{`${post.likes.includes(logic.getUserId()) ? '❤️' : '🤍'} ${post.likes.length} like${post.likes.length === 1 ? '' : 's'}`}</Button>
            <CommentList comments={post.comments}/>
            <CommentPostForm onPostCommented = {onPostCommented} postid={post._id}/>
        </View>

        <View direction='row' className={'dateAndDelete'}>
            <Time>{post.date}</Time>

            {post.author.id === logic.getUserId() && <Button onClick={handleDeletePost} className={'DeleteButton'}>Delete</Button>}
        </View>
    </View >
}

export default Post