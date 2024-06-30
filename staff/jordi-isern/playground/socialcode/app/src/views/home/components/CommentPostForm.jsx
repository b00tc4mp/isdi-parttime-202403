import './CommentPostForm.css'

import SubmitButton from "../../../Components/Core/SubmitButton";
import Text from "../../../Components/Core/Text";
import View from "../../../Components/Library/View";
import Form from "../../../Components/Core/Form";

import logic from "../../../logic";

function CommentPostForm({postid, onPostCommented}){
    console.log('CommentPost -> render')

    const handlePostComment = event =>{
        event.preventDefault()
        console.log('event', event)

        const form = event.target

        const comment = form.comment.value
        try{
            logic.createComment(postid, comment, error => {
                if(error) {
                    console.log(error)

                    alert(error.message)
                }
                onPostCommented()

                form.reset()
            })
        }catch(error){
            console.error(error)

            alert(error.message)
        }
    }

    return <Form onSubmit = {handlePostComment}>
        <textarea className='textArea' rows={4} cols={30} id="comment"></textarea>
        <SubmitButton>Comment</SubmitButton>
    </Form>
}

export default CommentPostForm