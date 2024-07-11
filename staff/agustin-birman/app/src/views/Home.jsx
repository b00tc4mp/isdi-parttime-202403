import { useState, useEffect } from 'react'

import './Home.css'

import View from '../components/library/View'
import Header from '../components/library/Header'
import Footer from '../components/library/Footer'
import Button from '../components/core/Button'
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
            <PostList onRefreshStamp={postListRefreshStamp} />

            {view === 'create-post' && <CreatePostForm onCancelCreatePostClick={handleCancelCreatePostClick} onPostCreated={handlePostCreated} />}
        </View>

        <Footer onCreatePostClick={handleCreatePostClick} />
    </View>
}

export default Home