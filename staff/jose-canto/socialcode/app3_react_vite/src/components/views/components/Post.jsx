import { useEffect, useState } from "react"

import Image from "../../core/Image"
import Heading from "../../core/Heading"
import Text from "../../core//Text"
import Time from "../../views/components/Time"
import ConfirmDelete from "./ConfirmDelete"
import Navbar from "./Navbar"
import CreateComment from "./CreateComment"

import logic from "../../../logic"
import CommentList from "./CommentList"

function Post({ post, onPostDeleted }) {
  console.log("Post --> render")

  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
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

  const handleDeletePost = () => setShowConfirmDelete(true)

  const confirmDeletePost = () => {
    try {
      //prettier-ignore
      logic.deletePost(post.id)
        .then(() => {
          onPostDeleted()
          setShowConfirmDelete(false)
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
    setShowConfirmDelete(false)
  }

  const handleLike = () => {
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
        return
      })
  }

  const handleShowComment = () => {
    setShowAddComment(!showAddComment)
  }

  const handleCommentPostSubmitted = () => {
    //TODO logic getPostComments (post.id), setComments(comments) DONE
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

  return (
    <>
      <article className="Article">
        <div className="Author_navbar">
          <Text className="AuthorTitle">{post.author.username}</Text>
          <Navbar post={post} handleDeletePost={handleDeletePost} />
        </div>

        <Heading level="2" className="PostTitle">
          {post.title}
        </Heading>
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
          {showConfirmDelete && (
            <ConfirmDelete post={post} onConfirmDeletePost={confirmDeletePost} onCancelDeletePost={cancelDeletePost} />
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
