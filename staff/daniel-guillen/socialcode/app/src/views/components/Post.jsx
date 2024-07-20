import Image from '../../components/core/Image'
import Heading from '../../components/core/Heading'
import Button from '../../components/core/Button'
import Text from '../../components/core/Text'
import Time from '../../components/core/Time'
import View from '../../components/library/View'
import logic from '../../logic'

//import './Post.css'

function Post({ post, onPostDeleted, onPostLikeToggled }) {
    console.log('Post -> render')

    const handleDeletePost = () => {
        if (confirm('Delete post? 😫'))
            try {
                logic.deletePost(post.id)
                    .then(() => {

                        onPostDeleted()
                        alert('Delete Post! 😵')
                        console.error(error)
                    })
                    .catch(error => {
                        console.log(error)
                        setMessage(error.message)
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

    return <View tag="article" align="">
        <View direction='center'>
        <Text>{post.author.username}</Text>

        <Heading level="3">{post.title}</Heading>
        </View>

        <div className='ContainerImg'><Image src={post.image} /></div>

        <Text>{post.description}</Text>
        
        <View direction='center'>
            <Button onClick={handleToggleLikePost}>{`${post.likes.includes(logic.getUserId()) ? '😍' : '🤍'} ${post.likes.length} laic${post.likes.length === 1 ? '' : 's'}`}</Button>
        </View>

        <View direction='center'>
            <Time>{post.date}</Time>

            {post.author.id === logic.getUserId() && <Button onClick={handleDeletePost}>🗑️</Button>}
        </View>
    </View>
}

export default Post