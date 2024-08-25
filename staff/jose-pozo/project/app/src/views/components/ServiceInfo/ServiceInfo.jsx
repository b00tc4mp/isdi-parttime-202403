import { useEffect, useState } from 'react'

import logic from '../../../logic/index'

import './ServiceInfo.css'

import Text from '../../../components/core/Text'
import Box from '../../../components/core/Text'
import Button from '../../../components/core/Button'

import ViewBox from '../../../components/library/ViewBox'



const ServiceInfo = ({ selectedService, oncloseServiceInfo }) => {

    const handleDeleteServiceClick = () => {
        if (!confirm(`Are you sure you want to delete service ${selectedService.name}?`)) return

        try {
            logic.deleteService(selectedService.id)
                .then(() => {
                    alert(`${selectedService.name} was deleted`)

                    setTimeout(() => {
                        oncloseServiceInfo()
                    }, 1500)
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }


    return <>
        <ViewBox tag={'section'} className='ServiceInfoSection'>

            <Text>Service Info</Text>

            <hr className='ServiceInfoHr'></hr>

            <Text className='my-4 text-4xl font-bold text-pale-sage'>{selectedService.name.toUpperCase()}</Text>
            <Text>Description</Text>
            <Text>{selectedService.description}</Text>
            <Text>Category</Text>
            <Text>{selectedService.category}</Text>
            <Text>Duration</Text>
            <Text>{selectedService.duration}</Text>
            <Text>Price</Text>
            <Text className='mb-4'>{selectedService.price}</Text>

            <Box className='ServiceInfoButtons'>
                <Button className='EditServiceButton'>Edit</Button>
                <Button className='DeleteServiceButton' onClick={handleDeleteServiceClick}>Delete</Button>
            </Box>

            <hr className='ServiceInfoHr'></hr>

            <Text className='ServiceInfoCreatedText'>{`Service created at ${selectedService.createdAt.slice(0, 10).split('-').reverse().join('/')}`}</Text>
            <Text className='ServiceInfoUpdatedText'>{`Last updated at ${selectedService.updatedAt.slice(0, 10).split('-').reverse().join('/')}`}</Text>

        </ViewBox>

    </>
}

export default ServiceInfo


