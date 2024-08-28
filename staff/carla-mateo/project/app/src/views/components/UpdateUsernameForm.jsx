import { useState } from 'react'
import useContext from '../../useContext'
import Button from '../../components/core/Button'
import Field from '../../components/core/Field'
import logic from '../../logic'

function UpdateUsernameForm({ onSuccess }) {
    const { alert } = useContext()

    const [message, setMessage] = useState('')

    const handleUpdateUsernameSubmit = (event) => {
        event.preventDefault()
        const form = event.target
        const username = form.username.value

        logic.updateUsername(username)
            .then(() => onSuccess())
            .catch((error) => {
                if (error instanceof SystemError) {
                    alert(error.message)
                }
            })
    }

    return (
        <form onSubmit={handleUpdateUsernameSubmit}>
            <Field id='username' type='text' placeholder='New username' />
            <Button type='submit'>Edit username</Button>
            {message && <p className='text-green-300 mt-4 text-sm'>{message}</p>}
        </form>
    )
}

export default UpdateUsernameForm