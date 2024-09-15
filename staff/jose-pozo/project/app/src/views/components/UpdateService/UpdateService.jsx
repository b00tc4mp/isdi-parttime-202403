import { useState } from 'react'

import './UpdateService.css'

import logic from '../../../logic/index'

import Input from '../../../components/core/Input'
import Button from '../../../components/core/Button'
import Text from '../../../components/core/Text'

import Box from '../../../components/core/Box'
import ViewBox from '../../../components/library/ViewBox'

import FormWithFeedback from '../../../components/library/FormWithFeedback'
import SubmitButton from '../../../components/core/SubmitButton'

function UpdateService({ selectedService, onSaveEditedService, onCloseEditedService }) {

    const [selectedOption, setSelectedOption] = useState('')

    const handleUpdateServiceSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const description = form.description.value
        const category = form.category.value
        const duration = form.duration.value
        const price = form.price.value

        const serviceUpdated = { name, description, category, duration, price }

        try {
            logic.updateService(selectedService.id, serviceUpdated)
                .then(() => {
                    alert(`Service ${name} was edited`)

                    setTimeout(() => {
                        onSaveEditedService()
                    }, 1500)
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    const handleChange = (event) => {
        setSelectedOption(event.target.value)
    }

    const handleCloseUpdateService = () => onCloseEditedService()

    return <>

        <ViewBox tag='section' className='UpdateServiceSection'>

            <Text className='UpdateServiceText'>Update Service Profile</Text>

            <hr className='border-1 border-fast-velvet'></hr>

            <FormWithFeedback className='UpdateServiceForm' onSubmit={handleUpdateServiceSubmit}>
                <Input id='name' type='text' placeholder={selectedService.name} required={false}></Input>
                <Input id='description' type='text' placeholder={selectedService.description} required={false}></Input>
                <Input id='category' type='text' placeholder={selectedService.category} required={false}></Input>

                <select id="duration" value={selectedOption} onChange={handleChange} className='UpdateServiceSelect' >
                    <option value="">Duration</option>
                    <option value='15'>15'</option>
                    <option value="30">30'</option>
                    <option value="45">45'</option>
                    <option value="60">60'</option>
                    <option value="75">75'</option>
                    <option value="90">90'</option>
                    <option value="105">105'</option>
                    <option value="120">120'</option>
                </select>

                <Input id='price' type='number' placeholder={selectedService.price} required={false}></Input>
                <Box className='UpdateServiceButtons'>
                    <SubmitButton className='UpdateServiceSaveButton'>Save</SubmitButton>
                    <Button onClick={handleCloseUpdateService} className='UpdateServiceCancelButton'>Cancel</Button>
                </Box>
            </FormWithFeedback>
        </ViewBox>
    </>
}

export default UpdateService