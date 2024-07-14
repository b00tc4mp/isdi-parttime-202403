import './CommentPostForm.css'

import SubmitButton from "../../../Components/Core/SubmitButton";
import Form from "../../../Components/Core/Form";

import logic from "../../../logic";

function CommentPostForm({post, onPostCommented}){
    console.log('CommentPost -> render')

    const handlePostComment = event =>{
        event.preventDefault()

        const form = event.target

        const comment = form.comment.value
        try{
            logic.createCommentPost(post.id, comment)
                .then(()=> onPostCommented())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        }catch(error){
            console.error(error)

            alert(error.message)
        }
    }

    return <Form onSubmit = {handlePostComment} className='CommentPostForm'>
        <textarea className='textArea' rows={4} cols={30} id="comment"></textarea>
        <SubmitButton>Comment</SubmitButton>
    </Form>
}

export default CommentPostForm