import Image from '../../components/core/Image'
import Heading from '../../components/core/Heading'
import './Post.css'
import logic from '../../logic'

function Post({ post, onPostDeleted }) {
  const handleDeletePost = (postId) => {
    if (confirm('Are you sure you want to delete this post?'))
      try {
        logic.deletePost(postId, (error) => {
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

  return (
    <article>
      <p>{post.author}</p>

      <Heading level='2'>{post.title}</Heading>

      <Image src={post.image} />

      <p>{post.description}</p>

      <time>{post.date}</time>

      {post.author === logic.getUserUsername() && (
        <button className='Button' onClick={() => handleDeletePost(post.id)}>
          Delete
        </button>
      )}
    </article>
  )
}

export default Post
