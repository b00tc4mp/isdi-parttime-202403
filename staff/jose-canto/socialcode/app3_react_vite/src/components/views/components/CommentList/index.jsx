import View from "../../../library/View"
import Comment from "../Comment"
import "./index.css"

function CommentList({ comments }) {
  console.log("commentList -> render")

  return (
    <div className="Container-CommentList">
      <fieldset>
        <legend>
          <h2>Comments</h2>
        </legend>
        <View tag="section" className="CommentList">
          {comments.map((comment, index) => (
            <Comment key={index} comment={comment} />
          ))}
        </View>
      </fieldset>
    </div>
  )
}

export default CommentList
