import './Post.css'

import Image from '../../components/core/Image'
import Heading from '../../components/core/Heading'
import Button from '../../components/core/Button'
import Text from '../../components/core/Text'
import Time from '../../components/core/Time'
import View from '../../components/library/View'

import logic from '../../logic'

function Post({ post, onPostDeleted }) {

    const handleDeletePost = () => {
        if (confirm('Delete post?'))
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

    return <View tag="article" className='Post' align="">
        <View>
            <Text>{post.author}</Text>

            <Heading level="2">{post.title}</Heading>
        </View>

        <Image src={post.image} />

        <Text>{post.description}</Text>

        <View className='PostFooter' direction='row'>
            <Time>{post.date}</Time>

            {post.author === logic.getLoggedInUsername() && <Button onClick={handleDeletePost}>Delete</Button>}
        </View>
    </View>
}

export default Post