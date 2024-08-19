import { useState, useEffect } from 'react'

import { useUserProfileContext } from '../../contexts/UserProfileProvider'

import logic from '../../logic/index'

import Text from '../../components/core/Text'

import ViewBox from '../../components/library/ViewBox'


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

        <ViewBox tag={'section'} className={`p-4 text-fast-velvet  rounded-md shadow-2xl bg-light-pale-sage z-10 border-solid border-2 row-span-3 col-span-2 h-full w-full col-start-5 row-start-2`}  >

            <Text>Customers</Text>

            <hr className='border-1 border-fast-velvet'></hr>

            <ul>
                {customers.map(customer => (
                    <li onClick={() => handleUserProfileClick(customer)} key={customer._id} className='my-2 w-full hover:cursor-pointer rounded bg-soft-gray p-1 text-left text-fast-velvet hover:bg-pale-sage hover:text-white-mist active:scale-95 active:bg-pale-sage;'>
                        {customer.name} {customer.surname}
                    </li>
                ))}
            </ul>

        </ViewBox>

    </>
}

export default CustomersList