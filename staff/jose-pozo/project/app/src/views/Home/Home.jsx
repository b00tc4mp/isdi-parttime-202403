import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserProfileContext } from '../../contexts/UserProfileProvider'

import './Home.css'

import logic from '../../logic/index'

import Button from '../../components/core/Button'
import Picture from '../../components/core/Picture'
import Text from '../../components/core/Text'
import Box from '../../components/core/Box'

import ViewBox from '../../components/library/ViewBox'

import CurrentTime from '../components/CurrentTime/CurrentTime'
import CreateCustomerForm from '../components/CreateCustomerForm/CreateCustomerForm'
import CustomersList from '../components/CustomersList/CustomersList'
import UserProfile from '../components/UserProfile/UserProfile'
import Calendar from '../components/Calendar/Calendar'
import AddService from '../components/Add Service/AddService'
import ServicesList from '../components/ServicesList/ServicesList'
// import Dropdown from './components/DropDown'

function Home() {
    const [name, setName] = useState('')
    const [showCreateCustomerForm, setShowCreateCustomerForm] = useState(false)
    const [showCustomersList, setShowCustomersList] = useState(false)
    const [showServicesList, setShowServicesList] = useState(false)
    const [showAddService, setShowAddService] = useState(false)
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
        setShowAddService(false)
        setShowServicesList(false)
    }

    const handleCloseCreateCustomerForm = () => {
        setShowCreateCustomerForm(false)
    }

    const handleCustomersList = () => {
        setShowCustomersList(!showCustomersList)
        setShowCreateCustomerForm(false)
        setShowCompoUserProfile(false)
        setShowAddService(false)
        setShowServicesList(false)
    }

    const handleServicesList = () => {
        setShowServicesList(!showServicesList)
        setShowCreateCustomerForm(false)
        setShowCompoUserProfile(false)
        setShowAddService(false)
        setShowCustomersList(false)
    }

    const handleAddService = () => {
        setShowAddService(!showAddService)
        setShowCreateCustomerForm(false)
        setShowCustomersList(false)
        setShowCompoUserProfile(false)
        setShowServicesList(false)
    }

    const handleCloseAddService = () => {
        setShowAddService(false)
    }


    return <>

        <ViewBox className={'HomeView'}>

            {showCreateCustomerForm && <CreateCustomerForm onClose={handleCloseCreateCustomerForm} />}

            {showCustomersList && <CustomersList />}

            {showCompoUserProfile && <UserProfile />}

            {showAddService && <AddService onClose={handleCloseAddService} />}

            {showServicesList && <ServicesList />}



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
                <Button className={'HomeSidebarButton'} onClick={handleCreateCustomer}>Add Customer</Button>
                <Button className={'HomeSidebarButton'} onClick={handleCustomersList}>Customers</Button>
                <Button className={'HomeSidebarButton'} onClick={handleServicesList}>Services</Button>
                <Button className={'HomeSidebarButton'} onClick={handleAddService}>Add Service</Button>
            </ViewBox>

            <ViewBox tag={'section'} className={'HomeCurrentTimeSection'}>
                <CurrentTime />
            </ViewBox>

            <ViewBox tag={'main'} className={'HomeDaily'} >DAILY</ViewBox>

            <ViewBox tag={'section'} className={'HomeCalendar'} >
                <Calendar />
            </ViewBox>

            <ViewBox tag={'section'} className={'HomeMiniContent'} >MINI CONTENT</ViewBox>

            <ViewBox tag={'section'} className={'HomeContent1'}>CONTENT 1</ViewBox>

            <ViewBox tag={'section'} className={'HomeContent2'} >CONTENT 2</ViewBox>

            <ViewBox tag={'footer'} className={'HomeFooter'} >FOOTER</ViewBox>

        </ViewBox >

    </>
}

export default Home

