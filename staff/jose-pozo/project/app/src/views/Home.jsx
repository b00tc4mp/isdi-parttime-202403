import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useUserProfileContext } from '../contexts/UserProfileProvider'

import logic from '../logic/index'

import Button from '../components/core/Button'
import Picture from '../components/core/Picture'
import Text from '../components/core/Text'
import Box from '../components/core/Box'

import ViewBox from '../components/library/ViewBox'

import CurrentTime from './components/CurrentTime'
import CreateCustomerForm from './components/CreateCustomerForm'
import CustomersList from './components/CustomersList'
import UserProfile from './components/UserProfile'
// import Dropdown from './components/DropDown'


function Home() {
    const [name, setName] = useState('')
    const [showCreateCustomerForm, setShowCreateCustomerForm] = useState(false)
    const [showCustomersList, setShowCustomersList] = useState(false)

    const { showCompoUserProfile, setShowCompoUserProfile } = useUserProfileContext()


    const navigate = useNavigate()

    const handleLogout = () => {
        logic.logoutUser()

        navigate('/login')
    }

    useEffect(() => {
        try {
            logic.getUserName()
                .then(name => setName(name))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])


    const handleCreateCustomer = () => {
        setShowCreateCustomerForm(!showCreateCustomerForm)
        setShowCustomersList(false)
        setShowCompoUserProfile(false)
    }

    const handleCloseCreateCustomerForm = () => {
        setShowCreateCustomerForm(false)
    }

    const handleCustomersList = () => {
        setShowCustomersList(!showCustomersList)
        setShowCreateCustomerForm(false)
        setShowCompoUserProfile(false)
    }



    return <>

        <ViewBox className={'HomeView'}>

            {showCreateCustomerForm && <CreateCustomerForm onClose={handleCloseCreateCustomerForm} />}

            {showCustomersList && <CustomersList />}

            {showCompoUserProfile && <UserProfile />}



            <ViewBox tag={'header'} className={'HomeHeader'} >

                <Text className={'DailyPlanner'}>DAILY PLANNER</Text>

                <Box className={'Profile'}>

                    <Text className={'ExportName'}>{name}</Text>

                    <Button className={'Profile'}>

                        <Picture src={'../../public/profile-icon.webp'} alt={'profile icon'} />

                    </Button>

                    <Button className={'Logout'} onClick={handleLogout} >LogOut</Button>

                </Box>

            </ViewBox>

            <ViewBox tag={'aside'} className={'HomeSidebar'} >

                <Button className={'HomeSidebarButton'} onClick={handleCreateCustomer}>Create Customers</Button>
                <Button className={'HomeSidebarButton'} onClick={handleCustomersList}>Customers List</Button>

            </ViewBox>

            <ViewBox tag={'section'} className={'HomeCurrentTimeSection'}>

                <CurrentTime />

            </ViewBox>

            <ViewBox tag={'main'} className={'HomeDaily'} >DAILY</ViewBox>

            <ViewBox tag={'section'} className={'HomeCalendar'} >CALENDAR</ViewBox>

            <ViewBox tag={'section'} className={'HomeMiniContent'} >MINI CONTENT</ViewBox>

            <ViewBox tag={'section'} className={'HomeContent1'}>CONTENT 1</ViewBox>

            <ViewBox tag={'section'} className={'HomeContent2'} >CONTENT 2</ViewBox>

            <ViewBox tag={'footer'} className={'HomeFooter'} >FOOTER</ViewBox>

        </ViewBox >

    </>
}

export default Home

