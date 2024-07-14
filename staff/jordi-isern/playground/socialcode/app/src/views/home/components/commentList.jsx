import "./commentList.css"

import View from "../../../Components/Library/View";

import logic from "../../../logic";
import Comment from "./Comment";


function CommentList ({comments}){
    console.log('commentList -> render')

    return <View tag='section' className='CommentList '>
        {comments.map( (comment, index) => <Comment comment={comment} key={index}/>  )}
    </View>
}

export default CommentList