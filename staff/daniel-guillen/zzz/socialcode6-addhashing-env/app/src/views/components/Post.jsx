import Image from '../../components/core/Image'
import Heading from '../../components/core/Heading'
import Button from '../../components/core/Button'
import Text from '../../components/core/Text'
import Time from '../../components/core/Time'
import View from '../../components/library/View'

import './Post.css'

import logic from '../../logic'

function Post({ post, onPostDeleted }) {
    console.log('Post -> render')

    const handleDeletePost = () => {
        if (confirm('Delete post? 😫'))
            try {
                logic.deletePost(post.id, error => {
                    if (error) {
                        console.error(error)

                        alert(error.message)

                        return
                    }

                    onPostDeleted()

                    alert('Delete Post! 😵')
                })
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
    }

    return <View tag="article" align="">
        <View direction='row'>
        <Text>{post.author}</Text>

        <Heading level="1">{post.title}</Heading>
        </View>

        <div className='ContainerImg'><Image src={post.image} /></div>

        <Text>{post.description}</Text>

        <View direction='row'>
            <Time>{post.date}</Time>

            {post.author === logic.getUserUsername() && <Button onClick={handleDeletePost}>🗑️</Button>}
        </View>
    </View>
}

export default Post