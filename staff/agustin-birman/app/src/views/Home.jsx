import { useState, useEffect } from 'react'

import { Routes, Route, useNavigate, Link } from 'react-router-dom'

import './Home.css'

import View from '../components/library/View'
import Header from '../components/library/Header'
import Footer from '../components/library/Footer'
import Button from '../components/core/Button'
import Heading from '../components/core/Heading'
import PostList from './components/PostList'
import CreatePostForm from './components/CreatePostForm'

import Hello from './components/Hello'
import Search from './components/Search'
import About from './components/About'

import logic from '../logic'

function Home({ onUserLoggedOut }) {

    const [name, setName] = useState('')
    const [view, setView] = useState('')
    const [postListRefreshStamp, setPostListRefreshStamp] = useState(0)

    const navigate = useNavigate()

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
            <Heading level='3'><Link to="/">{name}</Link></Heading>
            <Heading level='3'><Link to="/about">About</Link></Heading>
            <Button onClick={handleLogout}>Logout</Button>
        </Header>

        <View tag='main'>
            <Routes>
                <Route path="/" element={<PostList onRefreshStamp={postListRefreshStamp} />} />

                <Route path="/about" element={<About />} />

                <Route path="/hello/:to" element={<Hello />} />

                <Route path="/Search" element={<Search />} />

            </Routes>

            {view === 'create-post' && <CreatePostForm onCancelCreatePostClick={handleCancelCreatePostClick} onPostCreated={handlePostCreated} />}
        </View>

        <Footer onCreatePostClick={handleCreatePostClick} />
    </View>
}

export default Home