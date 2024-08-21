import { useUserProfileContext } from '../../../contexts/UserProfileProvider'

import logic from '../../../logic/index'

import Input from '../../../components/core/Input'
import Button from '../../../components/core/Button'

import ViewBox from '../../../components/library/ViewBox'

import './UpdateCustomerProfile.css'
import FormWithFeedback from '../../../components/library/FormWithFeedback'
import SubmitButton from '../../../components/core/SubmitButton'

function UpdateCustomerProfile({ onSaveCustomerProfile }) {
    const { selectedUserProfile } = useUserProfileContext()

    const handleUpdateCustomerProfileSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const surname = form.surname.value
        const email = form.email.value
        const phone = form.phone.value

        const customerUpdated = { name, surname, email, phone }

        try {
            logic.updateCustomer(selectedUserProfile.id, customerUpdated)
                .then(() => {
                    alert(`Customer ${name} ${surname} was edited`)

                    setTimeout(() => {
                        onSaveCustomerProfile()
                    }, 1500)
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    return <>
        <ViewBox tag='section' className='EditCustomerProfileSection'>
            <FormWithFeedback className='EditCustomerProfileForm' onSubmit={handleUpdateCustomerProfileSubmit}>
                <Input id={'name'} placeholder='Name' required={false}></Input>
                <Input id={'surname'} placeholder='Surname' required={false}></Input>
                <Input id={'email'} placeholder='Email' required={false}></Input>
                <Input id={'phone'} placeholder='Phone' required={false}></Input>
                <SubmitButton className='EditCustomerProfileSubmit'>Save</SubmitButton>
                <Button className='EditCustomerProfileCancel'>Cancel</Button>
            </FormWithFeedback>
        </ViewBox>
    </>
}

export default UpdateCustomerProfile