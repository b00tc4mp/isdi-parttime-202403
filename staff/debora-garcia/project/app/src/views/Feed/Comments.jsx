
import logic from "../../logic"
import Button from "../../components/Button"

import "./Comments.css"
import useContext from "../../useContext"

import { useState, useEffect } from "react"


export default function Comments({ postId, onCancelCommentsClick, author }) {
    console.log("Comments -> render")
    const { alert } = useContext()

    const [comments, setComments] = useState([])

    useEffect(() => {
        console.log("Comments -> useEffect")
        loadComments()
    }, [postId])
    const loadComments = () => {
        try {
            logic.getAllComments(postId)
                .then(comments => {
                    setComments(comments)
                })
                .catch((error) => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    const handleCreateCommentSubmit = (event) => {
        event.preventDefault()
        const form = event.target
        const text = form.text.value
        try {
            logic.createComment(postId, text)
                .then(() => {
                    loadComments()
                    form.reset()
                })
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })

        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleCancelCreateComment = () => {
        onCancelCommentsClick()
    }

    return (

        <div>
            <form className="Comments" onSubmit={handleCreateCommentSubmit}>

                <div className="comments-container">
                    <div className="comments-header">
                        <h6>Comments</h6>
                        <p> <Button type="button" className="cancel-comment-button" onClick={handleCancelCreateComment}>✕</Button></p>
                    </div>
                    <div className="CommentsList">
                        {comments.length === 0 ? (
                            <p>No comments yet</p>
                        ) : (
                            comments.map(comment => (
                                <div key={comment.id} className="comment">
                                    <p className="comment-author">{comment.author.username}</p>
                                    <p>{comment.text}</p>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="comment-form-container">

                        <div className="comment-form">
                            <textarea id="text" type="text" placeholder={`Add a comment to ${author}...`} />
                            <Button type="submit" className="submit-comment-button">
                            <i class="fa-regular fa-paper-plane"></i>
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )

}

