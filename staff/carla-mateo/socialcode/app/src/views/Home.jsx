import { useState, useEffect } from 'react'

import View from '../components/library/View'

import Header from './components/Header'
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
    }

    useEffect(() => {
        console.log('Home -> useEffect')
        try {
            logic.getUserName()
                .then((name) => setName(name))
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

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    return <View>
        <Header>
            <div className='ContainerTitle'><Heading className="SocialTitle" level="1">SOCIAL CODE</Heading></div>
            <div className="Username" level="3">
                <Button className="LogoutButton" onClick={handleLogout}>Logout</Button>
                {name}
            </div>

        </Header>

        <View className="View">
            <PostList refreshStamp={postListRefreshStamp} />

            {view === 'create-post' &&
                <CreatePostForm
                    onCancelCreatePostClick={handleCancelCreatePostClick}
                    onPostCreated={handlePostCreated}
                    onClickScrollTop={scrollTop}
                />
            }
        </View>

        <Footer onCreatePostClick={handleCreatePostClick} onClickScrollTop={scrollTop} />
    </View>
}

export default Home