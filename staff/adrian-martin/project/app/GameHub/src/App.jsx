import { useState } from 'react'

import Form from './components/core/Form'
import Title from './components/core/Title'
import Field from './components/core/Field'
import SubmitButton from './components/core/SubmitButton'
import Link from './components/core/Link'

import './App.css'


function App() {
    const [view, setView] = useState('register')

    return <>
        {view === 'register' && <Form>
            <Title>Game Hub</Title>

            <Field id='Username' placeholder='NAME'></Field>

            <Field id='Username' placeholder='USERNAME'></Field>

            <Field id='Username' placeholder='E-MAIL'></Field>

            <Field id='Username' placeholder='PASSWORD'></Field>

            <Field id='Username' placeholder='REPEAT PASSWORD'></Field>

            <SubmitButton>REGISTER</SubmitButton>

            <Link>LOGIN</Link>

        </Form>}
    </>
}

export default App
