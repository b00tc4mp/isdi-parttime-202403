import Image from '../../components/core/Image'
import Heading from '../../components/core/Heading'
import Button from '../../components/core/Button'
import Text from '../../components/core/Text'
import Time from '../../components/core/Time'
import View from '../../components/library/View'

import logic from '../../logic'

function Post({ post, onPostDeleted }) {
    console.log('Post -> render')

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

    return <View tag="article">
        <Text>{post.author}</Text>

        <Heading level="2">{post.title}</Heading>

        <Image src={post.image} />

        <Text>{post.description}</Text>

        <div style={{
            display: 'flex', alignItems: 'center', gap: '1rem'
        }}>
            <Time>{post.date}</Time>

            {/*<time>{formatDate(post.date)}</time>*/}

            {post.author === logic.getLoggedInUsername() && <Button onClick={handleDeletePost}>Delete</Button>}

            {/* <button>Helllllllloo</button> */}
        </div>
    </View >
}

export default Post