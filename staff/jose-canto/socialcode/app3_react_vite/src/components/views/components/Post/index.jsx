import { useEffect, useState } from "react"

import useContext from "../../../../useContext"

import Image from "../../../core/Image"
import Heading from "../../../core/Heading"
import Text from "../../../core/Text"
import Time from "../Time"
import Confirm from "../Confirm"
import Navbar from "../Navbar"
import CreateComment from "../CreateComment"

import logic from "../../../../logic"
import CommentList from "../CommentList"

import EditPostForm from "../EditPostForm"
import "./index.css"

function Post({ post, onPostDeleted, onPostEdited }) {
  console.log("Post --> render")

  const { alert } = useContext()

  const [showConfirm, setShowConfirm] = useState("")
  const [like, setLike] = useState(false)
  const [likeNum, setLikeNum] = useState(0)
  const [showAddComment, setShowAddComment] = useState(false)
  const [comments, setComments] = useState([])

  useEffect(() => {
    setLike(includeUserLike())
    setLikeNum(post.liked.length)
    setComments(post.comments)
  }, [])

  const includeUserLike = () => {
    const username = logic.getUserId()
    return post.liked.includes(username)
  }

  const handleDeletePost = () => setShowConfirm("Delete")

  const confirmDeletePost = () => {
    try {
      //prettier-ignore
      logic.deletePost(post.id)
        .then(() => {
          onPostDeleted()
          setShowConfirm("Delete")
        })
        .catch((error) => {
          console.error(error)
          return
        })
    } catch (error) {
      console.error(error)
      alert(error.message)
    }
  }
  const cancelDeletePost = () => {
    setShowConfirm("")
  }

  const handleLike = () => {
    try {
      //prettier-ignore
      logic.toggleLike(post.id)
        .then(() => {
          
          if (like) {
            setLike(false)
            setLikeNum(likeNum - 1)
          } else {
            setLike(true)
            setLikeNum(likeNum + 1)
          }
        })
        .catch((error) => {
          console.error(error)
          alert(error.message)
        })
    } catch (error) {
      console.error(error)
      alert(error.message)
    }
  }

  const handleShowComment = () => {
    setShowAddComment(!showAddComment)
  }

  const handleCommentPostSubmitted = () => {
    try {
      //prettier-ignore
      logic.getPostComments(post.id)
        .then((comments) => {
          setComments(comments)
          setShowAddComment(false)
        })
        .catch((error) => {
          console.error(error)
          alert(error.message)
          return
        })
    } catch (error) {
      console.error(error)
      alert(error.message)
    }
  }

  const onClickEditPost = () => setShowConfirm("EditPost")

  const handleEditPost = () => {
    onPostEdited()
    setShowConfirm("")
  }
  const handleCancelEditPost = () => {
    setShowConfirm("")
  }

  return (
    <>
      <article className="Article">
        <div className="Author_navbar">
          <Text className="AuthorTitle">{post.author.username}</Text>
          <Navbar post={post} handleDeletePost={handleDeletePost} onClickEditPost={onClickEditPost} />
        </div>

        <Heading level="2" className="PostTitle">
          {post.title}
        </Heading>
        {showConfirm === "EditPost" && (
          <EditPostForm postId={post.id} onPostEdited={handleEditPost} onCancelEditPost={handleCancelEditPost} />
        )}
        <div className="TextContainer">
          <Text className="PostText">{post.description}</Text>
        </div>

        <div className="DivImage">
          <Image className="Image" src={post.image}></Image>
          {showAddComment && (
            <CreateComment
              onCommentPostSubmitted={handleCommentPostSubmitted}
              postId={post.id}
              onCancelCreatedCommentClick={handleShowComment}
            />
          )}
          {showConfirm === "Delete" && (
            <Confirm
              action="Delete"
              post={post}
              onConfirmDeletePost={confirmDeletePost}
              onCancelDeletePost={cancelDeletePost}
            />
          )}
        </div>

        <div className="TimeLike">
          <Time>{post.date}</Time>
          <i className={`Likes ${like ? "fa-solid fa-heart" : "fa-regular fa-heart"}`} onClick={handleLike}>
            <sub>{likeNum}</sub>
          </i>
          <span className="IconComment">
            <i className="fa-regular fa-comments" onClick={handleShowComment}></i>
          </span>
        </div>

        <CommentList comments={comments} />
      </article>
    </>
  )
}

export default Post
