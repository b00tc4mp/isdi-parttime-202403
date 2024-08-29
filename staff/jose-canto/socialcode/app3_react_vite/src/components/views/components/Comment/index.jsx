import Time from "../Time"
import View from "../../../library/View"
import "./index.css"
import Text from "../../../core/Text"

function Comment({ comment, index }) {
  return (
    <>
      <View tag="section" className="Comment">
        <Text key={index}>
          <span className="Comment-author">{comment.author.username}</span> : {comment.text}
          <Time className="Comment-date">{comment.date}</Time>
        </Text>
      </View>
    </>
  )
}

export default Comment
