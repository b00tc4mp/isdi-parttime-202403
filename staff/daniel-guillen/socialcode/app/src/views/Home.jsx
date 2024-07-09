import { useState, useEffect } from 'react'

import View from '../components/library/View'

import Header from './components/Header'
import Title from '../components/core/Title'
import PostList from './components/PostList'
import Footer from './components/Footer'
import CreatePostForm from './components/CreatePostForm'

import Button from '../components/core/Button'

import Heading from '../components/core/Heading'

import logic from '../logic'

function Home({ onUserLoggedOut }) {
    console.log('Home -> render')

    const [name, setName] = useState('')
    const [view, setView] = useState('')
    const [postListRefreshStamp, setPostListRefreshStamp] = useState(0)

    const handleLogout = () => {
        logic.logoutUser()

        onUserLoggedOut()
        alert('see you soon! 🖖🏻')
    }

    useEffect(() => {
        console.log('Home -> useEffect')

        try {
            logic.getUserName()
                .then(name => {
                    console.log('Home -> setName')

                    setName(name)
                })
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
            <div className="Home"><Title>SocialCode</Title></div>
            <div className="UserName"><Heading level="3">👋🏻 Welcome {name} ! !</Heading></div>
            <div className="Logout"><Button onClick={handleLogout}>Bye Bye 😴</Button></div>
        </Header>

        <View tag="main">
        <PostList refreshStamp={postListRefreshStamp} />

        {view === 'create-post' && <CreatePostForm onCancelCreatePostClick={handleCancelCreatePostClick} onPostCreated={handlePostCreated} />}
        </View>
        
        <Footer onCreatePostClick={handleCreatePostClick} />
        <footer></footer>
    </View>
}

export default Home