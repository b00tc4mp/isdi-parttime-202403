import Image from "../../components/core/Image"
import Heading from "../../components/core/Heading"
import Button from "../../components/core/Button"
import Text from "../../components/core/Text"
import Time from "../../components/core/Time"

import View from "../../components/library/View"
import Confirm from "./Confirm"

import logic from "../../logic"
import { useState } from "react"

import useContext from "../../useContext"

function Post({ post, onPostDeleted, onPostLikeToggled }) {
  console.log("Post -> render")

  const { alert } = useContext()

  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false)

  const handleDeletePost = () => setConfirmDeleteVisible(true)

  const handleToggleLikePost = () => {
    try {
      logic
        .toggleLikePost(post.id)
        .then(() => onPostLikeToggled())
        .catch((error) => {
          console.error(error)

          alert(error.message)
        })
    } catch (error) {
      console.error(error)

      alert(error.message)
    }
  }

  const handleDeletePostAccepted = () => {
    try {
      logic
        .deletePost(post.id)
        .then(() => onPostDeleted())
        .catch((error) => {
          console.error(error)

          alert(error.message)
        })
    } catch (error) {
      console.error(error)

      alert(error.message)
    }
  }

  const handleDeletePostCancelled = () => setConfirmDeleteVisible(false)

  return (
    <View tag="article" align="">
      <View direction="row">
        <Text>{post.author.username}</Text>

        <Heading level="2">{post.title}</Heading>
      </View>

      <Image src={post.image} />

      <Text>{post.description}</Text>

      <View direction="row">
        <Button onClick={handleToggleLikePost}>{`${
          post.likes.includes(logic.getUserId()) ? "❤️" : "🤍"
        } ${post.likes.length} like${
          post.likes.length === 1 ? "" : "s"
        }`}</Button>
      </View>

      <View direction="row">
        <Time>{post.date}</Time>

        {post.author.id === logic.getUserId() && (
          <Button onClick={handleDeletePost}>Delete</Button>
        )}
      </View>

      {confirmDeleteVisible && (
        <Confirm
          message="Delete post?"
          onAccept={handleDeletePostAccepted}
          onCancel={handleDeletePostCancelled}
        />
      )}
    </View>
  )
}

export default Post
