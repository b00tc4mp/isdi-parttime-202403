import { useState, useEffect } from 'react'

import { useUserProfileContext } from '../../../contexts/UserProfileProvider'

import './CustomersList.css'

import logic from '../../../logic/index'

import Text from '../../../components/core/Text'
import Input from '../../../components/core/Input'

import ViewBox from '../../../components/library/ViewBox'


const CustomersList = () => {

    const [customers, setCustomers] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const { handleUserProfileClick, showCompoUserProfile } = useUserProfileContext()

    const handleSearchChange = event => setSearchTerm(event.target.value)

    const filteredCustomers = customers.filter(service => service.name.toLowerCase().includes(searchTerm.toLowerCase()))

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
    }, [showCompoUserProfile])


    return <>

        <ViewBox tag={'section'} className='CustomersListSection'>

            <Text>Customers</Text>

            <hr className='CustomersListHr'></hr>

            <Input className='CustomersSearchInput' type="text" placeholder="&#128269; Search Customer" value={searchTerm} onChange={handleSearchChange} />

            <ul className='CustomersListUl'>
                {filteredCustomers.map(customer => (
                    <li onClick={() => handleUserProfileClick(customer)} key={customer.id} className='CustomersListLi'>
                        {customer.name} {customer.surname}
                    </li>
                ))}
            </ul>

        </ViewBox>

    </>
}

export default CustomersList