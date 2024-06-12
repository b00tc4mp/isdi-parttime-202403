import { useState, useEffect } from 'react'
import Title from '../components/core/Title'
import View from '../components/library/View'
import Header from './components/Header'
import Button from '../components/core/Button'
import logic from '../logic'
import Heading from '../components/core/Heading'
import PostList from './components/PostList'

function Home({ onUserLoggedOut }) {
    console.log('Home -> render')

    const [name, setName] = useState('')

    const handleLogout = () => {
        logic.logoutUser()

        onUserLoggedOut()
    }

    useEffect(() => {
        try {
            logic.getUserName((error, name) => {
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
    })

    return <View>
        <Header>
            <Heading level="3">{name}</Heading>
            <Button onClick={handleLogout}>Logout</Button>
        </Header>
        <View tag='main'>
            <PostList />
        </View>
        <footer></footer>


    </View>
}

export default Home