import { useState, useEffect } from 'react'

import { Routes, Route, useNavigate, Link } from 'react-router-dom'

import View from '../components/library/View'

import Header from './components/Header'
import PostList from './components/PostList'
import Footer from './components/Footer'
import CreatePostForm from './components/CreatePostForm'
import Hello from './components/Hello'
import Search from './components/Search'
import Alert from './components/Alert'

import Button from '../components/core/Button'
import Heading from '../components/core/Heading'
// import Link from '../components/core/Link'


import logic from '../logic'
import About from './components/About'

function Home({ onUserLoggedOut }) {
    console.log('Home -> render')

    const [name, setName] = useState('')
    const [view, setView] = useState('')
    const [postListRefreshStamp, setPostListRefreshStamp] = useState(0)

    // const navigate = useNavigate()

    const [message, setMessage] = useState(null)

    const handleLogout = () => {
        logic.logoutUser()

        onUserLoggedOut()
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

                    setMessage(error.message)
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

    // const handleAboutClick = event => {
    //     event.preventDefault()

    //     navigate('/about')
    // }

    const handleAlertAccept = () => setMessage(null)

    return <View>
        <Header>

            <Heading level="1"><Link to="/">SocialCode</Link></Heading>

            <View direction="row">

                <Heading level="3">{name}</Heading>

                {/* <Link onClick={handleAboutClick}>About</Link> */}

                <Link to='/about'>About</Link>

                <Button onClick={handleLogout}>Logout</Button>

            </View>
        </Header>

        <View className="Main" tag="main">
            {/* <PostList refreshStamp={postListRefreshStamp} /> */}

            <Routes>

                <Route path="/" element={<PostList refreshStamp={postListRefreshStamp} />} />

                <Route path="/about" element={<About />} />

                <Route path="/hello/:to" element={<Hello />} />

                <Route path="/search" element={<Search />} />

            </Routes>

            {view === 'create-post' && <CreatePostForm onCancelCreatePostClick={handleCancelCreatePostClick} onPostCreated={handlePostCreated} />}
        </View>

        <Footer onCreatePostClick={handleCreatePostClick} />

        {message && <Alert message={message} onAccept={handleAlertAccept} />}
    </View>
}

export default Home