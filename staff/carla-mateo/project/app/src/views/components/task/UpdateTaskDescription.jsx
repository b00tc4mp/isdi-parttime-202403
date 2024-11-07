
import Button from '../../../components/core/Button'

import useContext from '../../../useContext'

import logic from '../../../logic/index'

function UpdateTaskDescription({ task, onEditSuccess, onCancelEditSuccess }) {
    const { alert } = useContext()


    const handleUpdateTaskDescriptionSubmit = (event) => {

        event.preventDefault()
        const form = event.target
        const description = form.description.value

        logic.updateTaskDescription(description, task.id)
            .then(() => onEditSuccess(description))
            .catch((error) => {
                if (error instanceof SystemError) {
                    alert(error.message)
                }
                alert("Not found")
            })
    }

    const handleCancelEdit = () => {
        onCancelEditSuccess()
    }

    return (
        <>
            <div className='fixed bottom-0 mb-20 left-1/2 transform -translate-x-1/2 bg-color-footer p-4 border-black rounded-lg shadow-lg'>
                <form onSubmit={handleUpdateTaskDescriptionSubmit}>
                    <textarea className='bg-green-100 border border-black shadow-lg placeholder-black rounded pt-2 pl-2' id='description' type='text' placeholder='New Description ' />
                    <Button type='submit'>Edit description</Button>
                    <Button onClick={handleCancelEdit} className='flex justify-between mt-4' type='button'>Cancel</Button>
                </form>
            </div>
        </>

    )
}

export default UpdateTaskDescription