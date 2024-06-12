import './Post.css'

import Image from '../../components/core/Image'

import Heading from '../../components/core/Heading'

import logic from '../../logic'

function Post({ post, onPostDeleted }) {
    console.log('Post -> render')

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

    return <article className='Post'>
        <p>{post.author}</p>

        <Heading level="2">{post.title}</Heading>

        <div className='ContainerImg'><Image src={post.image} /></div>

        <p>{post.description}</p>

        <time>{post.date}</time>

        {post.author === logic.getLoggedInUsername() && <button className="Button" onClick={() => handleDeletePost(post.id)}>Delete</button>}
    </article>
}

export default Post