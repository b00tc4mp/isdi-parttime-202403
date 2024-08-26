import UpdateUsernameForm from './UpdateUsernameForm'
import UpdateEmailForm from './UpdateEmailForm'
import UpdateAvatarForm from './UpdateAvatarForm'
import Button from '../../components/core/Button'

function UpdateDataUser({ onSuccessEdit, onCancelEditSuccess }) {

    const handleCancelEdit = () => {
        onCancelEditSuccess()
    }

    return (
        <div className='fixed bottom-0 mb-20 left-1/2 transform -translate-x-1/2 bg-color-footer p-4 rounded-lg shadow-lg'>
            <UpdateUsernameForm onSuccess={onSuccessEdit} />
            <UpdateEmailForm onSuccess={onSuccessEdit} />
            <UpdateAvatarForm onSuccess={onSuccessEdit} />
            <Button onClick={handleCancelEdit} className='flex justify-between mt-4' type='button'>Cancel</Button>
        </div>
    )
}

export default UpdateDataUser