import './AddService.css'

import { useState } from 'react'

import UseContext from '../../../UseContext'

import logic from '../../../logic/index'

import Input from '../../../components/core/Input'
import SubmitButton from '../../../components/core/SubmitButton'
import Text from '../../../components/core/Text'

import ViewBox from '../../../components/library/ViewBox'
import FormWithFeedback from '../../../components/library/FormWithFeedback'


function AddService({ onClose }) {

    // const [message, setMessage] = useState('')

    const { alert } = UseContext()

    const [selectedOption, setSelectedOption] = useState('')

    const handleAddServiceSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const description = form.description.value
        const category = form.category.value
        const duration = parseFloat(form.duration.value)
        const price = parseFloat(form.price.value)

        try {
            logic.addService(name, description, category, duration, price)
                .then(() => {
                    alert('¡Service added!')

                    setTimeout(() => {

                        onClose()

                    }, 2000)
                })
                .catch(error => {
                    alert(error.message)
                })

        } catch (error) {
            alert(error.message)
        }
    }


    const handleChange = (event) => {
        setSelectedOption(event.target.value)
    }

    return <>

        <ViewBox tag='section' className='AddServiceSection' >

            <Text>Add Service</Text>

            <hr className='AddServiceHr'></hr>

            <FormWithFeedback className='AddServiceForm' onSubmit={handleAddServiceSubmit}>
                <Input id='name' type='text' placeholder='Name'></Input>
                <Input id='description' type='text' placeholder='Description' required={false}></Input>
                <Input id='category' type='text' placeholder='Category' required={false}></Input>

                <select id="duration" value={selectedOption} onChange={handleChange} className='AddServiceSelect' >
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

                <Input id='price' type='text' placeholder='Price €' required={false}></Input>
                <SubmitButton className={'AddServiceSubmitButton'}>Submit</SubmitButton>
            </FormWithFeedback>

        </ViewBox >

    </>
}

export default AddService