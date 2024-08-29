import { useState, useEffect } from 'react'

import View from '../components/library/View'

import Header from './components/Header'
import Button from '../components/core/Button/Button'

import Heading from '../components/core/Heading'
import PostList from './components/PostList'
import Footer from './components/Footer'
import CreatePostForm from './components/CreatePostForm'


import logic from '../logic/index'

function Home({ onUserLoggedOut }) {
    console.log('Home -> render')

    const [name, setName] = useState('')
    const [view, setView] = useState('')
    const [postListRefreshStamp, setPostListRefreshStamp] = useState(0)

    const handleLogout = () => {
        logic.logoutUser()

        onUserLoggedOut()
    }

    useEffect(() => {
        try {
            logic.getUserName(name)
                .then(name => {
                    console.log('Home -> setName')

                    setName(name)
                })
                .catch((error) => {
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
            <Heading className='SocialCodeTitle' level='1'>SocialCode</Heading>
            <div className='HeaderRight'>
                <Heading level="3">{name}</Heading>
                <Button onClick={handleLogout}>Logout</Button>
            </div>
        </Header>

        <View tag='main'>
            <PostList refreshStamp={postListRefreshStamp} />

            {view === 'create-post' && <CreatePostForm onCancelCreatePostClick={handleCancelCreatePostClick} onPostCreated={handlePostCreated} />}

        </View>
        <Footer onCreatePostClick={handleCreatePostClick} />


    </View>
}

export default Home