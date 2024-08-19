import { useEffect, useState } from 'react'

import { useUserProfileContext } from '../../contexts/UserProfileProvider'

import logic from '../../logic/index'

import Text from '../../components/core/Text'
import Box from '../../components/core/Box'
import Button from '../../components/core/Button'

import ViewBox from '../../components/library/ViewBox'

const UserProfile = () => {

    const { selectedUserProfile, showCompoUserProfile, setShowCompoUserProfile } = useUserProfileContext()


    useEffect(() => {

        try {
            logic.getUserProfile(selectedUserProfile.id)
                .then(UserProfile => UserProfile)
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])


    const handleDeleteProfileClick = () => {

        try {
            logic.deleteCustomer(selectedUserProfile.id)
                .then(() => {

                    alert(`${selectedUserProfile.name} ${selectedUserProfile.surname} was deleted`)

                    setTimeout(() => {

                        setShowCompoUserProfile(!showCompoUserProfile)

                    }, 1500)

                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const createDate = selectedUserProfile.createdAt.slice(0, 10).split('-').reverse().join('/')
    const updateDate = selectedUserProfile.updatedAt.slice(0, 10).split('-').reverse().join('/')


    return <>

        <ViewBox tag='section' className={`p-4 text-fast-velvet rounded-md shadow-2xl bg-light-pale-sage z-20 border-solid border-2 row-span-3 col-span-3 h-full w-full col-start-2 row-start-2`}  >

            <fieldset className='h-3/4 p-6 w-full flex flex-col justify-between  border-solid border-2 rounded-md border-fast-velvet' >

                <legend className='ml-10 pl-2 pr-2 font-semibold' > User Profile </legend>

                {/* <Text>User Profile</Text> */}

                {/* <hr className='border-1 border-fast-velvet' ></hr> */}


                <Box className='bg-pale-sage  w-24 h-24 text-5xl font-bold text-white-mist flex justify-center items-center   rounded-full p-2'>
                    <Text>{`${selectedUserProfile.name[0]}${selectedUserProfile.surname[0]}`}</Text>
                </Box>

                <Box>
                    <Text className='ProfileText'>Name : <span className='ml-4'>{selectedUserProfile.name} {selectedUserProfile.surname}</span></Text>
                    <Text className='my-1'>Email : <span className='ml-4'><a href={`mailto:${selectedUserProfile.email}`}>{selectedUserProfile.email}</a></span></Text>
                    <Text className='ProfileText'>Phone : <span className='ml-4'>{selectedUserProfile.phone}</span></Text>
                </Box>

                <Box className='flex justify-between'>
                    <Button className='EditProfileButton' >Edit</Button>
                    <Button className='DeleteProfileButton' onClick={handleDeleteProfileClick}>Delete</Button>
                </Box>

            </fieldset >


            <Text className='font-normal mt-10'>{`Customer created at ${createDate}`}</Text>
            <Text className='font-normal mt-2'>{`Last updated at ${updateDate}`}</Text>


        </ViewBox>

    </>
}

export default UserProfile


