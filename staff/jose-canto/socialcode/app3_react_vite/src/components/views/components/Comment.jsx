import Time from "./Time"
import View from "../../library/View"
import "./Comment.css"

function Comment({ comment, index }) {
  return (
    <>
      <View tag="section" className="Comment">
        <p key={index}>
          <span className="Comment-author">{comment.author.username}</span> : {comment.text}
          <Time className="Comment-date">{comment.date}</Time>
        </p>
      </View>
    </>
  )
}

export default Comment
