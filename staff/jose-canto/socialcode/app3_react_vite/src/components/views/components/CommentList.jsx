import View from "../../library/View"
import "./CommentList.css"

function CommentList({ comments }) {
	console.log("commentList -> render")

	return (
		<View tag="section" className="CommentList">
			{comments.map((comment, index) => (
				<p key={index}>
					{comment.author}: {comment.text}
				</p>
			))}
		</View>
	)
}

export default CommentList
