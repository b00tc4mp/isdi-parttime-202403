import { useEffect, useState } from 'react'

import logic from '../../../logic/index'

import './ServiceInfo.css'

import Text from '../../../components/core/Text'
import Box from '../../../components/core/Text'
import Button from '../../../components/core/Button'

import ViewBox from '../../../components/library/ViewBox'
import UpdateService from '../UpdateService/UpdateService'

import Confirm from '../Confirm/Confirm'

const ServiceInfo = ({ selectedService, oncloseServiceInfo }) => {

    const [showEditService, setShowEditService] = useState(false)

    const [confirm, setConfirm] = useState(false)

    const handleConfirm = () => {
        setConfirm(!confirm)
    }

    const handleDeleteServiceClick = () => {

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

    const handleEditServiceClick = () => setShowEditService(!showEditService)

    const handleCloseUpdateService = () => {
        setShowEditService(false)
        oncloseServiceInfo()
    }


    return <>

        {confirm && <Confirm handleDeleteService={handleDeleteServiceClick} message={`Are you sure you want to delete this service?`} onCancel={handleConfirm} />}

        {showEditService && <UpdateService onCloseEditedService={handleCloseUpdateService} onSaveEditedService={handleCloseUpdateService} selectedService={selectedService} oncloseUpdateService={handleCloseUpdateService} />}

        <ViewBox tag={'section'} className='ServiceInfoSection'>

            <Text>Service Info</Text>

            <hr className='ServiceInfoHr'></hr>

            <Text className='my-4 text-4xl font-bold text-pale-sage'>{selectedService.name.toUpperCase()}</Text>
            <Text>&#9999; {selectedService.description}</Text>
            <Text>&#127991; {selectedService.category}</Text>
            <Text>&#9202; {selectedService.duration} minutes</Text>
            <Text className='mb-4'>&#128182; {selectedService.price} €</Text>

            <Box className='ServiceInfoButtons'>
                <Button className='EditServiceButton' onClick={handleEditServiceClick}>Edit</Button>
                <Button className='DeleteServiceButton' onClick={handleConfirm}>Delete</Button>
            </Box>

            <hr className='ServiceInfoHr'></hr>

            <Text className='ServiceInfoCreatedText'>{`Service created at ${selectedService.createdAt.slice(0, 10).split('-').reverse().join('/')}`}</Text>
            <Text className='ServiceInfoUpdatedText'>{`Last updated at ${selectedService.updatedAt.slice(0, 10).split('-').reverse().join('/')}`}</Text>

        </ViewBox>

    </>
}

export default ServiceInfo


