import { useState, useEffect } from 'react'

import View from '../components/library/View'
import Header from '../components/library/Header'
import Footer from '../components/library/Footer'
import Button from '../components/core/Button'
import Heading from '../components/core/Heading'
import PostList from './components/PostList'

import userLogic from '../userLogic'

function Home({ onUserLoggedOut }) {

    const [name, setName] = useState('')

    const handleLogout = () => {
        userLogic.logoutUser()

        onUserLoggedOut()
    }

    useEffect(() => {
        try {
            userLogic.getUserName((error, name) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                setName(name)
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    return <View>
        <Header>
            <Heading level='3'>{name}</Heading>
            <Button onClick={handleLogout}>Logout</Button>
        </Header>

        <View tag='main'>
            <PostList />

        </View>

        <Footer>
            <Button>+</Button>
        </Footer>
    </View>
}

export default Home