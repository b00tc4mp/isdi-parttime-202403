import Text from '../../core/Text'
import Button from '../../core/Button'
import './index.css'

function ConfirmDelete({ message, onCancel, onAccept }) {
    return <div className='ConfirmDelete'>
        <Text>{message}</Text>
        <div className='ConfirmDeleteButtonContainer'>
            <Button className='btn btn-secondary ConfirmDeleteButton' onClick={onCancel}>Cancel</Button>
            <Button className='btn btn-danger ConfirmDeleteButton' onClick={onAccept}>Confirm</Button>
        </div>
    </div>
}

export default ConfirmDelete