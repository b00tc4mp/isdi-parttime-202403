import { useState } from 'react'
import Field from "../../components/core/Field"
import Button from '../../components/core/Button'
import logic from '../../logic/index'

function RegisterUserForm({ onSuccessRegister, onCancelSuccess }) {
    const [registrationMessage, setRegistrationMessage] = useState('')

    const handleRegisterUserSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const username = form.username.value
        const email = form.email.value
        const password = form.password.value
        const avatar = form.avatar.value
        const family = form.family.value

        try {
            logic.registerUser(name, username, email, password, avatar, family)
                .then(() => {
                    setRegistrationMessage('User registered successfully')
                    setTimeout(() => {
                        setRegistrationMessage('')
                        onSuccessRegister()
                    }, 2000)
                })
                .catch(error => {
                    alert(error.message)
                })
        } catch (error) {
            alert(error.message)
        }
    }

    const handleCancel = () => {
        onCancelSuccess()
    }

    return <>
        <div className='fixed bottom-0 mb-20 left-1/2 transform -translate-x-1/2 bg-color-footer p-4 rounded-lg shadow-lg'>
            <form className='mb-4' onSubmit={handleRegisterUserSubmit}>
                <Field id="name" type="text" placeholder="name home" />
                <Field id="username" type="text" placeholder="username" />
                <Field id="email" type="email" placeholder="name@example.com" />
                <Field id="password" type="password" placeholder="password" />
                <Field id="family" type="text" placeholder="family" />

                <label htmlFor="avatar">Select an avatar:</label>
                <select id="avatar" name="avatar" className="right-0 mt-2 m-4 w-30 bg-green-100 border border-green-800 shadow-lg">
                    <option value="avatars/azul.png">azul</option>
                    <option value="avatars/rojo.png">rojo</option>
                    <option value="avatars/amarillo.png">amarillo</option>
                    <option value="avatars/naranja.png">naranja</option>
                    <option value="avatars/morado.png">morado</option>
                    <option value="avatars/verde.png">verde</option>
                </select>
                <Button className="flex justify-between" type="submit">Create User</Button>
                <Button onSubmit={handleCancel} className="flex justify-between" type="submit">Cancel</Button>
            </form>
            {registrationMessage.length > 0 && <p className="text-black-500 text-lg">{registrationMessage}</p>}
        </div>

    </>


}

export default RegisterUserForm