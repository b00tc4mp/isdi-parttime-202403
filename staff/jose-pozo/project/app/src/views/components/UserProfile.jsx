import { useEffect } from 'react'

import { useUserProfileContext } from '../../contexts/UserProfileProvider'



import logic from '../../logic/index'

import Text from '../../components/core/Text'
import Box from '../../components/core/Box'

import ViewBox from '../../components/library/ViewBox'

const UserProfile = () => {

    const { selectedUserProfile } = useUserProfileContext()

    useEffect(() => {

        console.log('selectedUserProfile:', selectedUserProfile);
        console.log('selectedUserProfile.id:', selectedUserProfile.id)

        try {
            logic.getUserProfile(selectedUserProfile.id)
                .then(selectedUser => selectedUser)
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    return <>

        <ViewBox tag='section' className={`p-4 text-fast-velvet rounded-md shadow-2xl bg-light-pale-sage z-20 border-solid border-2 row-span-3 col-span-3 h-full w-full col-start-2 row-start-2`}  >

            <fieldset className='border-solid border-2 rounded-md border-fast-velvet' >

                <legend className='ml-10' > User Profile </legend>

                <Text>User Profile</Text>

                <hr className='border-1 border-fast-velvet' ></hr>

                <Box>
                    <Text>{`Name: ${selectedUserProfile.name} `}</Text>
                    <Text>{`Surname: ${selectedUserProfile.surname}`} </Text>
                    <Text> {`Email: ${selectedUserProfile.email}`} </Text>
                    <Text> {`Phone: ${selectedUserProfile.phone}`} </Text>
                </Box>

            </fieldset >

        </ViewBox>

    </>
}

export default UserProfile


