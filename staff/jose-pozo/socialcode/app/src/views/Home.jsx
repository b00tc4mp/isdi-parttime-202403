import { useState, useEffect } from 'react'

import './Home.css'

import View from '../components/library/View'
import Button from '../components/core/Button'
import Footer from './components/Footer'
import Header from './components/Header'
import Heading from '../components/core/Heading'

import PostList from './components/PostList'
import CreatePostForm from './components/CreatePostForm'

import logic from '../logic'

function Home({ onUserLoggedOut }) {
    const [name, setName] = useState('')
    const [view, setView] = useState('')
    const [postListRefreshStamp, setPostListRefreshStamp] = useState(0)

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
    }, [])

    const handleCreatePostClick = () => setView('create-post')

    const handleCancelCreatePostClick = () => setView('')

    const handlePostCreated = () => {
        setPostListRefreshStamp(Date.now())

        setView('')
    }



    return <View>
        <Header>
            <Heading level='3'>{name}</Heading>
            <Button onClick={handleLogout}>Logout</Button>
        </Header>

        <View tag='main'>
            <PostList refreshStamp={postListRefreshStamp} />

            {view === 'create-post' && <CreatePostForm onCancelCreatePostClick={handleCancelCreatePostClick} onPostCreated={handlePostCreated} />}
        </View>

        <Footer onCreatePostClick={handleCreatePostClick} />
    </View >
}

export default Home