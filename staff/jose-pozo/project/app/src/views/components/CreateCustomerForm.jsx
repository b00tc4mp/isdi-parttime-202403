import { useState, useEffect } from 'react'

import logic from '../../logic/index'

import Field from '../../components/core/Field'
import SubmitButton from '../../components/core/SubmitButton'
import Text from '../../components/core/Text'

import ViewBox from '../../components/library/ViewBox'
import FormWithFeedback from '../../components/library/FormWithFeedback'

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

                        onClose();

                    }, 5000);
                })

                .catch(error => {
                    console.log(error)

                    setMessage(error.message)
                })

        } catch (error) {
            console.error(error)

            setMessage(error.message)
        }
    }


    return <>
        <ViewBox tag='section' className={`p-4 text-fast-velvet rounded-md shadow-2xl bg-light-pale-sage z-10 border-solid border-2 row-span-2 col-span-2 h-full w-full col-start-5 row-start-3`}  >

            <Text>Create Customer</Text>

            <hr className='border-1 border-fast-velvet'></hr>

            <FormWithFeedback className={'CreateCustomerForm'} onSubmit={handlerCreateCustomerSubmit} message={message} >

                <Field id='name' type='text' placeholder='Name'></Field>

                <Field id='surname' type='text' placeholder='Surname'></Field>

                <Field id='email' type='email' placeholder='Email'></Field>

                <SubmitButton className={'CreateCustomerSubmit'}>Submit</SubmitButton>

            </FormWithFeedback>

        </ViewBox>
    </>
}

export default CreateCustomerForm
