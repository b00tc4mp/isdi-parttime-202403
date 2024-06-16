import Button from "../../core/Button"

import './ConfirmDelete.css'

function ConfirmDelete({ onConfirmDeletePost, onCancelDeletePost }) {
	return (
		<>
			<div className="Confirm">
				<p>Are you sure you want delete this post? ⚠️</p>
				<div className="options">
				<Button className="ButtonCancel" onClick={onCancelDeletePost}>
					Cancel
				</Button>
				<Button className="ButtonConfirm" onClick={onConfirmDeletePost}>
					Confirm
				</Button>
			</div>
		</div >
		</>
	)
}

export default ConfirmDelete