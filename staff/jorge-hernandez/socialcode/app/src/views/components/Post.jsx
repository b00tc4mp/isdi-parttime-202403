import Image from '../../components/core/Image'
import Heading from '../../components/core/Heading'
import Button from '../../components/core/Button'
import Text from '../../components/core/Text'
import './Post.css'
import logic from '../../logic'

function Post({ post, onPostDeleted }) {
  const date = new Date(post.date)
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }
  const formattedDate = date.toLocaleDateString(undefined, options)

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
    <article className='Post'>
      <div className='header-post'>
        <Text>{post.author}</Text>

        {post.author === logic.getUserUsername() && (
          <Button
            className='Button delete'
            title='Delete Post'
            onClick={() => handleDeletePost(post.id)}
          >
            x
          </Button>
        )}
      </div>

      <Heading level='2'>{post.title}</Heading>

      <Image src={post.image} />

      <Text>{post.description}</Text>

      <div className='button-container'>
        <time className='Time'>{formattedDate}</time>

        {/* {post.author === logic.getUserUsername() && (
          <Button
            className='Button delete'
            title='Delete Post'
            onClick={() => handleDeletePost(post.id)}
          >
            x
          </Button>
        )} */}
      </div>

      <hr className='custom-hr' />
    </article>
  )
}

export default Post
