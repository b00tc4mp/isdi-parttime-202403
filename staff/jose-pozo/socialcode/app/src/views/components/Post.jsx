import Image from '../../components/core/Image'
import Heading from '../../components/core/Heading'
import Button from '../../components/core/Button'
import Text from '../../components/core/Text'

import logic from '../../logic'

function Post({ post, onPostDeleted }) {

    const handlePostDeleted = (postId) => {
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


        return <View tag='article'>
            <Text>{post.author}</Text>

            <Heading level='2'>{post.title}</Heading>

            <Image src={post.image} />

            <Text>{post.description}</Text>

            <View direction='row'>
                <Time>{post.date}</Time>

                {post.author === logic.getLoggedInUsername() && <Button onClick={() => handlePostDeleted}>Delete</Button>}
            </View>

        </View>
    }
}

export default Post