import { useState } from 'react'
import Button from '../../components/core/Button'
import ImageSelect from './ImageSelect'
import logic from '../../logic'

function UpdateAvatarForm({ onSuccess }) {
    const [selectedAvatar, setSelectedAvatar] = useState('avatars/azul.png')
    const [message, setMessage] = useState('')

    const avatarOptions = [
        { value: 'avatars/azul.png', label: 'azul' },
        { value: 'avatars/rojo.png', label: 'rojo' },
        { value: 'avatars/amarillo.png', label: 'amarillo' },
        { value: 'avatars/naranja.png', label: 'naranja' },
        { value: 'avatars/morado.png', label: 'morado' },
        { value: 'avatars/verde.png', label: 'verde' },
    ]

    const handleUpdateAvatarSubmit = (event) => {
        event.preventDefault()

        logic.updateAvatar(selectedAvatar)
            .then(() => onSuccess())
            .catch(error => {
                console.error(error.message)
                setMessage(error.message)
            })
    }

    return (
        <form onSubmit={handleUpdateAvatarSubmit}>
            <label htmlFor='avatar'>Select an avatar:</label>
            <ImageSelect
                id='avatar'
                name='avatar'
                options={avatarOptions}
                value={selectedAvatar}
                onChange={setSelectedAvatar}
            />
            <Button type='submit'>Edit profile</Button>
            {message && <p className='text-green-300 mt-4 text-sm'>{message}</p>}
        </form>
    )
}

export default UpdateAvatarForm