import { useState } from 'react'
import Button from '../../components/core/Button'
import Field from '../../components/core/Field'
import logic from '../../logic'

function UpdateEmailForm({ onSuccess }) {
    const [message, setMessage] = useState('')

    const handleUpdateEmailSubmit = (event) => {
        event.preventDefault()
        const form = event.target
        const email = form.email.value

        logic.updateEmail(email)
            .then(() => onSuccess())
            .catch(error => {
                console.error(error.message)
                setMessage(error.message)
            })
    }

    return (
        <form onSubmit={handleUpdateEmailSubmit}>
            <Field id='email' type='email' placeholder='New email' />
            <Button type='submit'>Edit profile</Button>
            {message && <p className='text-green-300 mt-4 text-sm'>{message}</p>}
        </form>
    )
}

export default UpdateEmailForm