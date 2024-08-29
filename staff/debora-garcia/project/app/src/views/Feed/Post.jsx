import { useEffect, useState } from "react"
import logic from "../../logic"
import Heading from "../../components/Heading"
import "./Post.css"
import useContext from "../../useContext"

import Button from "../../components/Button"
import Comments from "./Comments"
export default function Post({ post, onPostLikeToggled }) {
    const { alert } = useContext()

    const [commentsSectionVisible, setCommentsSectionVisible] = useState(false)

    const handleToggleLikePost = (post) => {
        try {
            logic.toggleLikePost(post.id)
                .then(() => onPostLikeToggled())
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })

        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleCancelCommentsClick = () => {
        setCommentsSectionVisible(false)
    }

    const getTimeDifference = (postDate) => {
        const now = new Date()
        const diffInMs = now - new Date(postDate)
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
      
        if (diffInMinutes < 60) {
          return `${diffInMinutes} min ago`
        } else if (diffInHours < 24) {
          return `${diffInHours} h ago`
        } else {
          return new Date(postDate).toLocaleDateString()
        }
      }
    return (
        <article key={post.id} >
            <div className="post-heading">
                <Heading level={6} className="Heading">{post.author.username}</Heading>
                <time>{getTimeDifference(post.date)}</time>
                </div>
            <div className="post-body">
                <img src={post?.image} className="post-image" />
                <p>{post.description}</p>
                <div className="post-footer-buttons">
                    <Button onClick={() => handleToggleLikePost(post)} className="like-button">
                        {post.likes.length > 0 && ` ${post.likes.length}`}
                        {post.likes.includes(logic.getUserId()) ? (
                            <i className="fa-solid fa-heart"></i>
                        ) : (
                            <i className="fa-regular fa-heart"></i>
                        )}
                    </Button>
                    <Button
                        onClick={() => setCommentsSectionVisible(!commentsSectionVisible)}
                        className="comment-button">
                        <i class="fa-regular fa-message"></i>
                    </Button>
                </div>

                <div className="post-footer">
                    <h6>
                        {post.workout.workoutType.toUpperCase()} {post.workout?.duration && ` ${post.workout.duration}'`} {post.workout.title && `"${post.workout.title}"`}
                    </h6>
                </div>


                <ul className="post-movements">
                    {post.workout.movements.map((movement, index) => (
                        <li key={index}>{movement.quantity} {movement.name}</li>
                    ))}
                </ul>
            </div>
            <div className="result-details">
                <p>
                    {post.result?.time && `Time:${post.result.time}" `}
                    {(post.result?.repetitions || post.result?.repetitions === 0) && `${post.result.repetitions} reps `}
                    {(post.result?.weight || post.result?.weight === 0) && `${post.result.weight}kg`}
                </p>
            </div>
            <div className="post-footer">

                {commentsSectionVisible && (
                    <Comments
                        postId={post.id}
                        author={post.author.username}
                        onCancelCommentsClick={handleCancelCommentsClick}
                    />
                )}
            </div>

        </article>
    )

}