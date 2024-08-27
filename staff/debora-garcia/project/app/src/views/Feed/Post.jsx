import { useEffect, useState } from "react"
import logic from "../../logic"
import Heading from "../../components/Heading"
import "./Post.css"
import Button from "../../components/Button"
import Comments from "./Comments"
export default function Post({ post, onPostLikeToggled }) {

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

    return (
        <article key={post.id} >
            <div className="post-header">
                <Heading level={6} className="Heading">{post.author.username}</Heading>
                <time>{new Date(post.date).toLocaleDateString()}</time>
            </div>
            <div className="post-body">
                <img src={post.image} alt={post.description} className="post-image" />
                <p>{post.description}</p>
                <br />

                <h6>{post.workout.workoutType.toUpperCase()}</h6>
                <h6>{post.workout.title}</h6>
                <ul className="post-movements">
                    {post.workout.movements.map((movement, index) => (
                        <li key={index}>{movement.quantity} {movement.name}</li>
                    ))}
                </ul>
            </div>
            <div className="result-details">
                <p>
                    {post.result?.time && `Time:${post.result.time} `}
                    {post.result?.repetitions && `${post.result.repetitions}reps `}
                    {post.result?.weight && `${post.result.weight}kg`}
                </p>
            </div>
            <div className="post-footer">
                <div className="post-footer-buttons">
                    <Button onClick={() => handleToggleLikePost(post)} className="like-button">
                        {`${post.likes.includes(logic.getUserId()) ? "♥︎" : "♡"} ${post.likes.length > 0 ? `${post.likes.length}` : ""}`}
                    </Button>
                    <Button onClick={() => setCommentsSectionVisible(!commentsSectionVisible)} className="comment-button">⌲</Button>
                </div>
                {commentsSectionVisible && <Comments postId={post.id} author={post.author.username} onCancelCommentsClick={handleCancelCommentsClick} />}

            </div>
        </article>
    )

}