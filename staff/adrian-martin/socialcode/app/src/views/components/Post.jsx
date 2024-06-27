import './Post.css'

import Image from '../../component/core/Image'
import Heading from '../../component/core/Heading'
import Button from '../../component/core/Button'
import Text from '../../component/core/Text'
import Time from '../../component/core/Time'

import View from '../../component/library/View'

import logic from '../../logic'



function Post({ post, onPostDeleted }) {
    const handleDeletePost = () => {
        if (confirm('Delete post?'))
            try {
                logic.deletePost(post.id, error => {
                    if (error) {
                        console.error(error)

                        alert(error)

                        return
                    }

                    onPostDeleted()
                })
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
    }


    return <View className='Post' tag='article' align=''>

        <Text>{post.author}</Text>

        <Heading level='2'>{post.title}</Heading>

        <Image src={post.image} />

        <Text>{post.description}</Text>

        <View direction='row'>
            <Time>{post.date}</Time>

            {post.author === logic.getLoggedInUsername() && <Button className="Button deleteButton" onClick={handleDeletePost}>Delete</Button>}
        </View>

    </View>
}

export default Post