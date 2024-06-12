import Image from '../../core/Image'
import Heading from '../../core/Heading'

import logic from '../../../logic'

function Post({ post, onPostDeleted }) {

    const handleDeletePost = postId => {
        try {
            logic.deletePost(postId, error => {
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

    return <article>
        <p>{post.author}</p>

        <Heading level="2">{post.title}</Heading>

        <Image src={post.image} />

        <p>{post.description}</p>

        <time>{post.date}</time>

        {post.author === logic.getLoggedInUsername() && <button className="Button" onClick={() => handleDeletePost(post.id)}>Delete</button>}
    </article>
}

export default Post