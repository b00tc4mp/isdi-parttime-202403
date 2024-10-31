import { useState, useEffect } from 'react'

import { useUserProfileContext } from '../../../contexts/UserProfileProvider'

import './ServicesList.css'

import logic from '../../../logic/index'

import Text from '../../../components/core/Text'
import Input from '../../../components/core/Input'

import ViewBox from '../../../components/library/ViewBox'

import ServiceInfo from '../ServiceInfo/ServiceInfo'

const ServicesList = () => {

    const [services, setServices] = useState([])
    const [showServiceInfo, setShowServiceInfo] = useState(false)
    const [selectedService, setSelectedService] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')

    const handleSearchChange = event => setSearchTerm(event.target.value)

    const filteredServices = services.filter(service => service.name.toLowerCase().includes(searchTerm.toLowerCase()))

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

    const handleCloseServiceInfo = () => {
        setShowServiceInfo(false)
    }


    return <>

        {showServiceInfo && <ServiceInfo oncloseServiceInfo={handleCloseServiceInfo} selectedService={selectedService} />}

        <ViewBox tag={'section'} className='ServicesListSection'>

            <Text>Services</Text>

            <hr className='ServicesListHr'></hr>

            <Input className='ServicesSearchInput' type="text" placeholder="&#128269; Search Service..." value={searchTerm} onChange={handleSearchChange} />

            <ul className='ServicesListUl'>
                {filteredServices.map(service => (
                    <li onClick={() => handleServiceClick(service)} key={service.id} className='ServicesListLi'>
                        {service.name}
                    </li>
                ))}
            </ul>

        </ViewBox>

    </>
}

export default ServicesList