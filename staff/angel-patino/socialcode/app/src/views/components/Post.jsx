import Image from "../../components/core/Image"
import Heading from "../../components/core/Heading"
import Button from "../../components/core/Button"
import Text from "../../components/core/Text"
import Time from "../../components/core/Time"

import logic from "../../logic"

function Post({ post, onPostDeleted }) {
  const handleDeletePost = () => {
    if (confirm("Delete post?"))
      try {
        logic.deletePost(postId, (error) => {
          if (error) {
            console.error(error)

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
      <Text>{post.author}</Text>

      <Heading level="2">{post.title}</Heading>

      <Image src={post.image} />

      <Text>{post.description}</Text>

      <Time>{post.date}</Time>

      {post.author === logic.getLoggedInUsername() && (
        <Button onClick={() => handleDeletePost(post.id)}>Delete</Button>
      )}
    </article>
  )
}
export default Post
