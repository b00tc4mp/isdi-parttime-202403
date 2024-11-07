import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import useContext from '../useContext'

import { TiArrowForward } from 'react-icons/ti'

import { SystemError } from 'com/errors'


import logic from '../logic/index'

import View from './library/View'

import Button from '../components/core/Button'
import Field from '../components/core/Field'
import Heading from '../components/core/Heading'
import Header from './components/Header'
import Footer from './components/Footer'
import ImageSelect from './components/ImageSelect'

function Register() {
    const { alert } = useContext()

    const navigate = useNavigate()
    const [selectedAvatar, setSelectedAvatar] = useState('avatars/azul.png')

    const handleRegisterSubmit = event => {
        event.preventDefault()

        const form = event.target
        const name = form.name.value
        const username = form.username.value
        const email = form.email.value
        const password = form.password.value
        const passwordRepeat = form.passwordRepeat.value
        const avatar = selectedAvatar
        const family = form.family.value

        try {
            logic.registerAdmin(name, username, email, password, passwordRepeat, avatar, family)
                .then(() => navigate('/login'))
                .catch((error) => {
                    if (error instanceof SystemError) {
                        alert(error.message)
                    }
                    alert("Invalid format")
                })
        } catch (error) {
            alert(error.message)
        }
    }

    const avatarOptions = [
        { value: 'avatars/azul.png', label: 'azul' },
        { value: 'avatars/rojo.png', label: 'rojo' },
        { value: 'avatars/amarillo.png', label: 'amarillo' },
        { value: 'avatars/naranja.png', label: 'naranja' },
        { value: 'avatars/morado.png', label: 'morado' },
        { value: 'avatars/verde.png', label: 'verde' },
    ]

    return <View>
        <Header></Header>
        <form className=' p-8 mt-24' onSubmit={handleRegisterSubmit}>
            <Heading level={1} className='text-2xl'>Create admin</Heading>
            <Field id='name' type='text' placeholder='name home' />
            <Field id='username' type='text' placeholder='username' />
            <Field id='email' type='email' placeholder='email@example.com' />
            <Field id='password' type='password' placeholder='password' />
            <Field id='passwordRepeat' type='password' placeholder='password repeat' />
            <Field id='family' type='text' placeholder='family' />
            <label htmlFor='avatar' className='block mt-4'>Select an avatar:</label>
            <ImageSelect
                id='avatar'
                name='avatar'
                options={avatarOptions}
                value={selectedAvatar}
                onChange={setSelectedAvatar}
            />
            <Button className='mb-4' type='submit'>Register</Button>
            <Link to='/login'>
                <span className='absolute top-6 right-0 p-4'>{<TiArrowForward size={32} />}</span>
            </Link>
        </form>
        <Footer></Footer>
    </View>
}

export default Register