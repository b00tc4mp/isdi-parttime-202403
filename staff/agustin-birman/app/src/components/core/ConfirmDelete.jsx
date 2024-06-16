import Text from "./Text"
import Button from "./Button"

import './ConfirmDelete.css'

function ConfirmDelete({ onCancelConfirm, onConfirmDelete }) {
    // const handleCancelConfirmDelete = onCancelConfirm()

    // const handleDeletePost = onConfirmDelete()


    return <div className="ConfirmDelete">
        <Text>Are you sure you want to delete this post?</Text>
        <Button onClick={onCancelConfirm}>Cancel</Button>
        <Button onClick={onConfirmDelete}>Confirm</Button>
    </div>
}

export default ConfirmDelete