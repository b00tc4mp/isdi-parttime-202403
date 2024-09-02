import { useState } from 'react'

import './CreateCustomerForm.css'

import logic from '../../../logic/index'

import Input from '../../../components/core/Input'
import SubmitButton from '../../../components/core/SubmitButton'
import Text from '../../../components/core/Text'

import ViewBox from '../../../components/library/ViewBox'
import FormWithFeedback from '../../../components/library/FormWithFeedback'




function CreateCustomerForm({ onClose }) {

    const [message, setMessage] = useState('')

    const handlerCreateCustomerSubmit = event => {

        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const surname = form.surname.value
        const email = form.email.value


        try {
            logic.createCustomer(name, surname, email)
                .then(() => {
                    setMessage('¡Customer created!')

                    setTimeout(() => {

                        onClose()

                    }, 1500)
                })
                .catch(error => {
                    setMessage(error.message)
                })

        } catch (error) {
            setMessage(error.message)
        }
    }


    return <>
        <ViewBox tag='section' className='CreateCustomerSection' >

            <Text>Add Customer</Text>

            <hr className='border-1 border-fast-velvet'></hr>

            <FormWithFeedback onSubmit={handlerCreateCustomerSubmit} message={message} >
                <Input id='name' type='text' placeholder='Name'></Input>
                <Input id='surname' type='text' placeholder='Surname'></Input>
                <Input id='email' type='email' placeholder='Email'></Input>
                <SubmitButton className={'CreateCustomerSubmit'}>Submit</SubmitButton>
            </FormWithFeedback>

        </ViewBox>
    </>
}

export default CreateCustomerForm
