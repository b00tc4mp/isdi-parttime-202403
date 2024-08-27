
import logic from "../../logic";
import Button from "../../components/Button";
import Field from "../../components/Field";

import "./Comments.css"

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";


export default function Comments({ postId }) {
    console.log("Comments -> render")

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
                })
                .catch(error => alert(error.message))

        } catch (error) {
            console.error(error)
        }
    }
    console.log(comments)

    return (

        <div>
            <form className="CreateCommentForm" onSubmit={handleCreateCommentSubmit}>
                <Field id="text" type="text" placeholder="Add a comment" />
                <div className="form-buttons-container">
                    <Button type="submit" className="comment-button">Send</Button>
                </div>
            </form>

            <div className="CommentsList">
                {comments.length === 0 ? (
                    <p>No comments yet</p>
                ) : (
                    comments.map(comment => (
                        <div key={comment.id} className="comment">
                            <p>{comment.text}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )

}

//TODO add comment to.. 