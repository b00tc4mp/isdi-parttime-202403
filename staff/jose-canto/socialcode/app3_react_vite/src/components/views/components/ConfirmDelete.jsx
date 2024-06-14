import Button from "../../core/Button"
import Text from "../../core/Text"

import "./ConfirmDelete.css"

function ConfirmDelete({ onConfirmDeletePost, onCancelDeletePost }) {
	return (
		<>
			<div className="Confirm">
				<Text>Delete the post?</Text>
				<Button className="Button" onClick={onCancelDeletePost}>
					Cancel
				</Button>
				<Button className="Button" onClick={onConfirmDeletePost}>
					Confirm
				</Button>
			</div>
		</>
	)
}

export default ConfirmDelete
