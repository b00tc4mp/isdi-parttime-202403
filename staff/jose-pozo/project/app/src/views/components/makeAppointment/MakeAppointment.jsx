import './MakeAppointment.css'

import { useState, useEffect } from 'react'

import UseContext from '../../../UseContext'

import logic from '../../../logic/index'

import Input from '../../../components/core/Input'
import SubmitButton from '../../../components/core/SubmitButton'
import Text from '../../../components/core/Text'

import ViewBox from '../../../components/library/ViewBox'
import FormWithFeedback from '../../../components/library/FormWithFeedback'


function MakeAppointment({ onClose, refreshAppointments }) {

    // const [message, setMessage] = useState('')

    const { alert } = UseContext()

    const [customers, setCustomers] = useState([])
    const [searchCustomerTerm, setSearchCustomerTerm] = useState('')
    const [selectedCustomer, setSelectedCustomer] = useState(null)

    const [services, setServices] = useState([])
    const [searchServiceTerm, setSearchServiceTerm] = useState('')
    const [selectedService, setSelectedService] = useState(null)

    const [selectedOption, setSelectedOption] = useState('')


    useEffect(() => {
        try {
            logic.getAllCustomers()
                .then(customers => setCustomers(customers))
                .catch(error => {
                    alert(error.message)
                })
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const handleSearchCustomersChange = event => setSearchCustomerTerm(event.target.value)
    const filteredCustomers = customers.filter(customer => customer.name.toLowerCase().includes(searchCustomerTerm.toLowerCase()))

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
    }, [])


    const handleSearchServicesChange = event => setSearchServiceTerm(event.target.value)
    const filteredServices = services.filter(service => service.name.toLowerCase().includes(searchServiceTerm.toLowerCase()))

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value)
    }

    const handleMakeAppointmentSubmit = event => {
        event.preventDefault()

        const form = event.target

        const customer = form.customer.value
        const service = form.service.value
        const date = form.date.value
        const time = form.time.value
        const status = form.status.value

        console.log(date, time)

        try {
            logic.makeAppointment(customer, service, date, time, status)
                .then(() => {
                    alert('¡Appointment made!')

                    setTimeout(() => {

                        onClose()

                        refreshAppointments()

                    }, 2000)
                })
                .catch(error => {
                    alert(error.message)
                })

        } catch (error) {
            alert(error.message)
        }
    }



    return <>

        <ViewBox tag='section' className='MakeAppointmentSection' >

            <Text>Make an Appointment</Text>

            <hr className='MakeAppointmentHr'></hr>

            <FormWithFeedback onSubmit={handleMakeAppointmentSubmit}>
                <input className='MakeAppointmentInput' type="text" placeholder="Search for client..." value={searchCustomerTerm} onChange={handleSearchCustomersChange} />
                <select id="customer" className='MakeAppointmentSelect' value={selectedCustomer?.id} onChange={(event) => setSelectedCustomer(customers.find(customer => customer.id === event.target.value))}>
                    <option value="">Select a customer</option>
                    {filteredCustomers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                            {customer.name} {customer.surname}
                        </option>
                    ))}
                </select>

                <input className='MakeAppointmentInput' type="text" placeholder="Search for service..." value={searchServiceTerm} onChange={handleSearchServicesChange} />

                <select id="service" className='MakeAppointmentSelect' value={selectedService?.id} onChange={(event) => setSelectedService(services.find(service => service.id === event.target.value))}>
                    <option value="">Select a service</option>
                    {filteredServices.map((service) => (
                        <option key={service.id} value={service.id}>
                            {service.name}
                        </option>
                    ))}
                </select>

                <Input id='date' type='date' placeholder='Date'></Input>
                <Input id='time' type='time' placeholder='Time'></Input>

                <select id="status" value={selectedOption} onChange={handleSelectChange} className='MakeAppointmentSelect' >
                    <option value="">Status</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                </select>

                <SubmitButton className={'MakeAppointmentSubmitButton'}>Submit</SubmitButton>
            </FormWithFeedback>

        </ViewBox >

    </>
}

export default MakeAppointment