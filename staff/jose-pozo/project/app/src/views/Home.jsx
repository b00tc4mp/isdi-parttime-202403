import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom'

import logic from '../logic/index'

import Button from '../components/core/Button'
import Picture from '../components/core/Picture';
import Text from '../components/core/Text';

import ViewBox from '../components/library/ViewBox'

import Dropdown from './components/DropDown';


function Home() {
    const [name, setName] = useState('')

    const navigate = useNavigate();

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

    return <>

        <ViewBox className={'HomeView'}>

            <ViewBox className={'HomeHeader'} tag={'header'}>

                <Text className={'DailyPlanner'}>DAILY PLANNER</Text>

                <ViewBox className={'Profile'}>
                    <Text className={'ExportName'}>{name}</Text>
                    <Button className={'Profile'}>
                        <Dropdown></Dropdown>
                    </Button>
                    <Button className={'Logout'} onClick={handleLogout} >LogOut</Button>
                </ViewBox>

            </ViewBox>

            <ViewBox className={'HomeSidebar'} tag={'aside'}>SIDEBAR</ViewBox>

            <ViewBox className={'HomeContent'} tag={'section'}>CONTENT</ViewBox>

            <ViewBox className={'HomeDaily'} tag={'main'}>DAILY</ViewBox>

            <ViewBox className={'HomeCalendar'} tag={'section'}>CALENDAR</ViewBox>

            <ViewBox className={'HomeMiniContent'} tag={'section'}>MINI CONTENT</ViewBox>

            <ViewBox className={'HomeContent1'} tag={'section'}>CONTENT 1</ViewBox>

            <ViewBox className={'HomeContent2'} tag={'section'}>CONTENT 2</ViewBox>

            <ViewBox className={'HomeFooter'} tag={'footer'}>FOOTER</ViewBox>


        </ViewBox >



    </>
}

export default Home

