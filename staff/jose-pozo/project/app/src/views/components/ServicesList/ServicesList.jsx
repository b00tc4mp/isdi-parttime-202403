import { useState, useEffect } from 'react'

import { useUserProfileContext } from '../../../contexts/UserProfileProvider'

import './ServicesList.css'

import logic from '../../../logic/index'

import Text from '../../../components/core/Text'

import ViewBox from '../../../components/library/ViewBox'

import ServiceInfo from '../ServiceInfo/ServiceInfo'

const ServicesList = () => {

    const [services, setServices] = useState([])
    const [showServiceInfo, setShowServiceInfo] = useState(false)
    const [selectedService, setSelectedService] = useState(null)

    useEffect(() => {
        try {
            logic.getAllServices()
                .then(services => setServices(services))
                .catch(error => {
                    alert(error.message)
                })
        } catch (error) {
            alert(error.message)
        }
    }, [showServiceInfo])

    const handleServiceClick = (service) => {
        setSelectedService(service)
        setShowServiceInfo(true)
    }

    const handleColseServiceInfo = () => {
        setShowServiceInfo(false)
    }


    return <>

        {showServiceInfo && <ServiceInfo oncloseServiceInfo={handleColseServiceInfo} selectedService={selectedService} />}

        <ViewBox tag={'section'} className='ServicesListSection'>

            <Text>Services</Text>

            <hr className='ServicesListHr'></hr>

            <ul className='ServicesListUl'>
                {services.map(service => (
                    <li onClick={() => handleServiceClick(service)} key={service._id} className='ServicesListLi'>
                        {service.name}
                    </li>
                ))}
            </ul>

        </ViewBox>

    </>
}

export default ServicesList