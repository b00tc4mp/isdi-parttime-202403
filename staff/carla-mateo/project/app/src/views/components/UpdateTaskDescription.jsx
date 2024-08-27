import { useState } from 'react'
import useContext from '../../useContext'
import Button from '../../components/core/Button'
import Field from '../../components/core/Field'
import logic from '../../logic'

function UpdateTaskDescription({ onSuccess, onCancelEditSuccess }) {
    const { alert } = useContext()
    const [message, setMessage] = useState('')

    const handleUpdateTaskDescriptionSubmit = (event) => {
        event.preventDefault()
        const form = event.target
        const description = form.description.value

        logic.UpdateTaskDescription(description)
            .then(() => onSuccess())
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
                    <Field id='description' type='text' placeholder='New description' />
                    <Button type='submit'>Edit task</Button>
                    <Button onClick={handleCancelEdit} className='flex justify-between mt-4' type='button'>Cancel</Button>
                </form>
            </div>
        </>

    )
}

export default UpdateTaskDescription