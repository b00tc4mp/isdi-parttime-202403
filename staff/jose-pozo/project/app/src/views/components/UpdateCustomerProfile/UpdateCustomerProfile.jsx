import { useUserProfileContext } from '../../../contexts/UserProfileProvider'

import './UpdateCustomerProfile.css'

import logic from '../../../logic/index'

import Input from '../../../components/core/Input'
import Button from '../../../components/core/Button'
import Text from '../../../components/core/Text'

import Box from '../../../components/core/Box'
import ViewBox from '../../../components/library/ViewBox'

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

        <ViewBox tag='section' className='UpdateCustomerProfileSection'>

            <Text className='UpdateCustomerProfileText'>Update Customer Profile</Text>

            <hr className='border-1 border-fast-velvet'></hr>

            <FormWithFeedback className='UpdateCustomerProfileForm' onSubmit={handleUpdateCustomerProfileSubmit}>
                <Input id='name' type='text' placeholder='Name' required={false}></Input>
                <Input id='surname' type='text' placeholder='Surname' required={false}></Input>
                <Input id='email' type='email' placeholder='Email' required={false}></Input>
                <Input id='phone' type='text' placeholder='Phone' required={false}></Input>
                <Box className='UpdateCustomerProfileButtons'>
                    <Button className='UpdateCustomerProfileSaveButton'>Save</Button>
                    <Button className='UpdateCustomerProfileCancelButton'>Cancel</Button>
                </Box>
            </FormWithFeedback>
        </ViewBox>
    </>
}

export default UpdateCustomerProfile