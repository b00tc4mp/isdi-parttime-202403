import { useEffect, useState } from 'react'
import { useUserProfileContext } from '../../../contexts/UserProfileProvider'

import logic from '../../../logic/index'

import './UserProfile.css'

import Text from '../../../components/core/Text'
import Box from '../../../components/core/Box'
import Button from '../../../components/core/Button'

import ViewBox from '../../../components/library/ViewBox'

import UpdateCustomerProfile from '../UpdateCustomerProfile/UpdateCustomerProfile'

const UserProfile = () => {
    const { selectedUserProfile, showCompoUserProfile, setShowCompoUserProfile } = useUserProfileContext()
    const [showEditCustomerProfile, setShowEditCustomerProfile] = useState(false)

    useEffect(() => {
        try {
            logic.getUserProfile(selectedUserProfile.id)
                .then(UserProfile => UserProfile)
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const handleDeleteCustomerClick = () => {
        if (!confirm(`Are you sure you want to delete customer ${selectedUserProfile.name} ${selectedUserProfile.surname}?`)) return

        try {
            logic.deleteCustomer(selectedUserProfile.id)
                .then(() => {
                    alert(`${selectedUserProfile.name} ${selectedUserProfile.surname} was deleted`)

                    setTimeout(() => {
                        setShowCompoUserProfile(!showCompoUserProfile)

                    }, 1500)
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    const createDate = selectedUserProfile.createdAt.slice(0, 10).split('-').reverse().join('/')
    const updateDate = selectedUserProfile.updatedAt.slice(0, 10).split('-').reverse().join('/')

    const handleEditCustomerClick = () => setShowEditCustomerProfile(!showEditCustomerProfile)

    const handleSaveCustomerProfile = () => {
        setShowEditCustomerProfile(!showEditCustomerProfile)
        setShowCompoUserProfile(!showCompoUserProfile)
    }

    const handleCloseUpdateCustomerProfile = () => {
        setShowEditCustomerProfile(false)
        setShowCompoUserProfile(!showCompoUserProfile)
    }

    return <>
        {showEditCustomerProfile && <UpdateCustomerProfile onSaveCustomerProfile={handleSaveCustomerProfile} onCloseUpdateCustomerProfile={handleCloseUpdateCustomerProfile} />}

        <ViewBox tag='section' className='UserProfileSection'  >
            <fieldset className='UserProfileFieldset' >
                <legend className='UserProfileLegend'> User Profile </legend>
                <Box className='UserProfileMainBox'>
                    <Box className='UserProfileInitialsBox'>
                        <Text>{`${selectedUserProfile.name[0]}${selectedUserProfile.surname[0]}`}</Text>
                    </Box>
                    <Box className='UserProfileDataBox'>
                        <Box className='flex '>
                            <Text className='UserProfileNameTextDataBox'>{selectedUserProfile.name}</Text>
                            <Text className='UserProfileSurnameTextDataBox'>{selectedUserProfile.surname}</Text>
                        </Box>
                        <Text className='UserProfileEmailTextDataBox '>{selectedUserProfile.email}</Text>
                        <Text className='UserProfilePhoneTextDataBox'>{selectedUserProfile.phone ? selectedUserProfile.phone : 'No phone number'}</Text>
                    </Box>
                </Box>
                <Box className='UseProfileButtonsMainBox'>
                    <Button className='EditProfileButton' onClick={handleEditCustomerClick}>Edit</Button>
                    <Button className='DeleteProfileButton' onClick={handleDeleteCustomerClick}>Delete</Button>
                </Box>
            </fieldset >
            <Text className='UserProfileCreatedText'>{`Customer created at ${createDate}`}</Text>
            <Text className='UserProfileUpdatedText'>{`Last updated at ${updateDate}`}</Text>
        </ViewBox >
    </>
}

export default UserProfile


