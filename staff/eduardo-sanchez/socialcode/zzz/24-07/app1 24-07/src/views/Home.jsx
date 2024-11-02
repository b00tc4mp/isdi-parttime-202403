import { useState, useEffect } from 'react'

import { Routes, Route, useNavigate, Link } from 'react-router-dom'

import View from '../components/library/View'

import Header from './components/Header'
import PostList from './components/PostList'
import Footer from './components/Footer'
import CreatePostForm from './components/CreatePostForm'
import Hello from './components/Hello'
import Search from './components/Search'

import Button from '../components/core/Button'
import Heading from '../components/core/Heading'

import logic from '../logic'
import About from './components/About'

function Home({ onMessage }) {

    const navigate = useNavigate()

    console.log('Home -> render')

    const [name, setName] = useState('')
    const [view, setView] = useState('')
    const [postListRefreshStamp, setPostListRefreshStamp] = useState(0)



    const handleLogout = () => {
        logic.logoutUser()

        // onUserLoggedOut()

        navigate('/login')
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

                    // alert(error.message + " " + "HELL")

                    onMessage(error.message)
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

            <Heading level="1"><Link to="/">SocialCode</Link></Heading>

            <View direction="row">

                <Heading level="3">{name}</Heading>

                <Link to='/about'>About</Link>

                <Button onClick={handleLogout}>Logout</Button>

            </View>
        </Header>

        <View className="Main" tag="main">

            <Routes>

                <Route path="/" element={<PostList refreshStamp={postListRefreshStamp} onMessage={onMessage} />} />

                <Route path="/about" element={<About />} />

                <Route path="/hello/:to" element={<Hello />} />

                <Route path="/search" element={<Search />} />

            </Routes>

            {view === 'create-post' && <CreatePostForm onCancelCreatePostClick={handleCancelCreatePostClick} onPostCreated={handlePostCreated} />}
        </View>

        <Footer onCreatePostClick={handleCreatePostClick} />

    </View>
}

export default Home