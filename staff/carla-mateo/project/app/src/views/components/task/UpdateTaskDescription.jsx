
import Button from '../../../components/core/Button'
import Field from '../../../components/core/Field'

import logic from '../../../logic/index'

function UpdateTaskDescription({ task, onEditSuccess, onCancelEditSuccess }) {

    const handleUpdateTaskDescriptionSubmit = (event) => {
        event.preventDefault()
        const form = event.target
        const description = form.description.value

        logic.updateTaskDescription(description, task.id)
            .then(() => onEditSuccess(description))
            .catch((error) => {
                alert(error.message)
            })
    }

    const handleCancelEdit = () => {
        onCancelEditSuccess()
    }

    return (
        <>
            <div className='fixed bottom-0 mb-20 left-1/2 transform -translate-x-1/2 bg-color-footer p-4 border-black rounded-lg shadow-lg'>
                <form onSubmit={handleUpdateTaskDescriptionSubmit}>
                    <Field id='description' type='text' placeholder='New description' />
                    <Button type='submit'>Edit task</Button>
                    <Button onClick={handleCancelEdit} className='flex justify-between mt-4' type='button'>Cancel</Button>
                </form>
            </div>
        </>

    )
}

export default UpdateTaskDescription