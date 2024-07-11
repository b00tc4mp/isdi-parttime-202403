import Button from "../../components/core/Button"
import Text from "../../components/core/Text"

import './ConfirmDelete.css'


function ConfirmDelete({ onConfirmDeletePost, onCancelDeletePost }) {
    return (
        <>
            <div className="ConfirmDeleteOverlay" onClick={onCancelDeletePost}></div>
            <div className="ConfirmDeleteForm">
                <Text className='ConfirmDeleteText'>Are you sure you want to delete the post?</Text>
                <div className="DeleteButtons">
                    <Button className='Button ConfirmCancelButton' onClick={onCancelDeletePost}>Cancel</Button>

                    <Button className='DeleteConfirmButton' onClick={onConfirmDeletePost}>Delete</Button>
                </div>
            </div>
        </>
    )
}

export default ConfirmDelete