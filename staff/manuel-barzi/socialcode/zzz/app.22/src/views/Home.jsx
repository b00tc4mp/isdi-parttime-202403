import { useState, useEffect } from 'react'

import View from '../components/library/View'

import Header from './components/Header'
import PostList from './components/PostList'

import Button from '../components/core/Button'
import Heading from '../components/core/Heading'

import logic from '../logic'

function Home({ onUserLoggedOut }) {
    console.log('Home -> render')

    const [name, setName] = useState('')

    const handleLogout = () => {
        logic.logoutUser()

        onUserLoggedOut()
    }

    useEffect(() => {
        console.log('Home -> useEffect')
        // setTimeout(() => {
        try {
            logic.getUserName((error, name) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                console.log('Home -> setName')

                setName(name)
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
        // }, 10000)
    }, [])

    return <View>
        <Header>
            <Heading level="3">{name}</Heading>
            <Button onClick={handleLogout}>Logout</Button>
        </Header>

        <View tag="main">
            <PostList />
        </View>

        <footer></footer>
    </View>
}

export default Home