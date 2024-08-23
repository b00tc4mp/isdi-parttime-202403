import { useState, useEffect } from 'react'

import { useUserProfileContext } from '../../../contexts/UserProfileProvider'

import './CustomersList.css'

import logic from '../../../logic/index'

import Text from '../../../components/core/Text'

import ViewBox from '../../../components/library/ViewBox'


const CustomersList = () => {

    const [customers, setCustomers] = useState([])

    const { handleUserProfileClick, showCompoUserProfile } = useUserProfileContext()

    useEffect(() => {
        try {
            logic.getAllCustomers()
                .then(customers => setCustomers(customers))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [showCompoUserProfile])


    return <>

        <ViewBox tag={'section'} className='CustomersListSection'>

            <Text>Customers</Text>

            <hr className='CustomersListHr'></hr>

            <ul>
                {customers.map(customer => (
                    <li onClick={() => handleUserProfileClick(customer)} key={customer._id} className='CustomersListLi'>
                        {customer.name} {customer.surname}
                    </li>
                ))}
            </ul>

        </ViewBox>

    </>
}

export default CustomersList