import View from "../../library/View"
import "./CommentList.css"
import Time from "./Time"

function CommentList({ comments }) {
	console.log("commentList -> render")

	return (
		<fieldset>
			<legend>
				<h2>Comments</h2>
			</legend>
			<View tag="section" className="CommentList">
				{comments.map((comment, index) => (
					<p key={index}>
						<span className="Comment-author">{comment.author.username}</span> : {comment.text}
						<Time className="Comment-date">{comment.date}</Time>
					</p>
				))}
			</View>
		</fieldset>
	)
}

export default CommentList
