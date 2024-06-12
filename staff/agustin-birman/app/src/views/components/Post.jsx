import './Post.css'

import Image from '../../components/core/Image'
import Heading from '../../components/core/Heading'
import Button from '../../components/core/Button'
import postLogic from '../../postLogic'
import userLogic from '../../userLogic'

function Post({ post, onPostDeleted }) {
    const handleDeletePost = postId => {
        try {
            postLogic.deletePost(postId, error => {
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

    return <article >
        <p className='Author'>{post.author}</p>

        <Heading className='Title' level='2'>{post.title}</Heading>

        <Image src={post.image} />

        <p className='Description'>{post.description}</p>

        <time>{post.date}</time>

        {post.author === userLogic.getLoggedInUsername() && <Button onClick={() => handleDeletePost(post.id)}>Delete</Button>}
    </article>
}

export default Post