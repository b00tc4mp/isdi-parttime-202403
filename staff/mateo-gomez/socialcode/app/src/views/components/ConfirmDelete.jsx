import Button from "../../components/core/Button"
import Text from "../../components/core/Text"

import './ConfirmDelete.css'


function ConfirmDelete({ onConfirmDeletePost, onCancelDeletePost }) {
    return (
        <>
            <div className="ConfirmDeleteOverlay" onClick={onCancelDeletePost}></div>
            <div className="ConfirmDelete">
                <Text>Are you sure you want to delete the post?</Text>
                <Button className='Button' onClick={onCancelDeletePost}>Cancel</Button>

                <Button className='CancelButton' onClick={onConfirmDeletePost}>Confirm</Button>
            </div>
        </>
    )
}

export default ConfirmDelete