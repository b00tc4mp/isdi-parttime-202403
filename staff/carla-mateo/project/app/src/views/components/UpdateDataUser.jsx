import { useState } from 'react'

import Button from '../../components/core/Button'

import logic from '../../logic'
import Field from '../../components/core/Field'
import ImageSelect from './ImageSelect'

function UpdateDataUser({ onSuccessEdit, onCancelEditSuccess }) {
    const [message, setMessage] = useState('')
    const [selectedAvatar, setSelectedAvatar] = useState('avatars/azul.png')

    const handleUpdateDataUserSubmit = (event) => {
        event.preventDefault()

        const form = event.target
        const username = form.username.value
        const email = form.email.value
        const avatar = selectedAvatar

        const updates = { username, email, avatar }

        try {
            logic.updateDataUser(updates)
                .then(() => onSuccessEdit())
                .catch(error => {
                    console.error(error.message)
                    setMessage(error.message)
                })
        } catch (error) {
            console.error(error.message)
            setMessage(error.message)
        }
    }

    const handleCancelEdit = () => {
        onCancelEditSuccess()
    }



    const avatarOptions = [
        { value: 'avatars/azul.png', label: 'azul' },
        { value: 'avatars/rojo.png', label: 'rojo' },
        { value: 'avatars/amarillo.png', label: 'amarillo' },
        { value: 'avatars/naranja.png', label: 'naranja' },
        { value: 'avatars/morado.png', label: 'morado' },
        { value: 'avatars/verde.png', label: 'verde' },
    ]

    return (
        <>
            <div className='fixed bottom-0 mb-20 left-1/2 transform -translate-x-1/2 bg-color-footer p-4 rounded-lg shadow-lg'>
                <form className='mb-4' onSubmit={handleUpdateDataUserSubmit}>
                    <Field id='username' type='text' placeholder='New username' />
                    <Field id='email' type='email' placeholder='New email' />
                    <label htmlFor='avatar' className='block mt-4  '>Select an avatar:</label>
                    <ImageSelect
                        id='avatar'
                        name='avatar'
                        options={avatarOptions}
                        value={selectedAvatar}
                        onChange={setSelectedAvatar}
                    />
                    <div className='flex flex-col justify-start mt-4 space-y-2'>
                        <Button className='flex justify-between' type='submit'>Edit profil</Button>
                        <Button onClick={handleCancelEdit} className='flex justify-between' type='button'>Cancel</Button>
                    </div>

                </form >
            </div>
        </>
    )
}

export default UpdateDataUser