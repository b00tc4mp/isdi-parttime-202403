import { useState } from 'react'
import Field from '../../components/core/Field'
import Button from '../../components/core/Button'
import logic from '../../logic/index'
import ImageSelect from './ImageSelect'

function RegisterUserForm({ onSuccessRegister, onCancelRegisterSuccess }) {
    const [registrationMessage, setRegistrationMessage] = useState('')
    const [selectedAvatar, setSelectedAvatar] = useState('avatars/azul.png')

    const handleRegisterUserSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const username = form.username.value
        const email = form.email.value
        const password = form.password.value
        const avatar = selectedAvatar
        const family = form.family.value

        try {
            logic.registerUser(name, username, email, password, avatar, family)
                .then(() => {
                    setRegistrationMessage('User registered successfully')
                    setTimeout(() => {
                        setRegistrationMessage('')
                        onSuccessRegister()
                    }, 1000)
                })
                .catch(error => {
                    alert(error.message)
                })
        } catch (error) {
            alert(error.message)
        }
    }

    const handleCancelRegister = () => {
        onCancelRegisterSuccess()
    }

    const avatarOptions = [
        { value: 'avatars/azul.png', label: 'azul' },
        { value: 'avatars/rojo.png', label: 'rojo' },
        { value: 'avatars/amarillo.png', label: 'amarillo' },
        { value: 'avatars/naranja.png', label: 'naranja' },
        { value: 'avatars/morado.png', label: 'morado' },
        { value: 'avatars/verde.png', label: 'verde' },
    ]

    return <>
        <div className='fixed bottom-0 mb-20 left-1/2 transform -translate-x-1/2 bg-color-footer p-4 border  border-black rounded-lg shadow-lg'>
            <form className='mb-4' onSubmit={handleRegisterUserSubmit}>
                <Field id='name' type='text' placeholder='name home' />
                <Field id='username' type='text' placeholder='username' />
                <Field id='email' type='email' placeholder='name@example.com' />
                <Field id='password' type='password' placeholder='password' />
                <Field id='family' type='text' placeholder='family' />
                <label htmlFor='avatar' className='block mt-4  '>Select an avatar:</label>
                <ImageSelect
                    id='avatar'
                    name='avatar'
                    options={avatarOptions}
                    value={selectedAvatar}
                    onChange={setSelectedAvatar}
                />
                <div className='flex flex-col justify-start mt-4 space-y-2'>
                    <Button className='flex justify-between' type='submit'>Create User</Button>
                    <Button onClick={handleCancelRegister} className='flex justify-between' type='button'>Cancel</Button>
                </div>

            </form>
            {registrationMessage.length > 0 && <p className='text-green-300 mt-4 text-sm'>{registrationMessage}</p>}
        </div>
    </>


}

export default RegisterUserForm