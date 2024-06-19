import './Post.css'

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
                alert('Deleted post!')
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <View tag="article" align="">
    <View direction='row'>
        <div className='TextAuthor'><Text>{post.author}</Text></div>

        <div className='TextTitle'><Heading level="1">{post.title}</Heading></div>
        </View>

        <div className='ContainerImg'><Image src={post.image} /></div>

        <div className='TextDescription'><Text>{post.description}</Text></div>

        <View direction='row'>
            <Time>{post.date}</Time>

        {post.author === logic.getUserUsername() && <Button onClick={handleDeletePost}>Delete</Button>}
        </View>
    </View>
}

export default Post