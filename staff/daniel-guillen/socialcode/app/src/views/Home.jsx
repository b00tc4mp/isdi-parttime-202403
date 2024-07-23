import { useState, useEffect } from 'react'

import { Routes, Route, useNavigate, Link } from 'react-router-dom'

import View from '../components/library/View'

import Header from './components/Header'
import Title from '../components/core/Title'
import PostList from './components/PostList'
import Footer from './components/Footer'
import CreatePostForm from './components/CreatePostForm'
import Hello from './components/Hello'
import Search from './components/Search'

import Button from '../components/core/Button'
import Heading from '../components/core/Heading'

import logic from '../logic'
import About from './components/About'

function Home({ onUserLoggedOut }) {
    console.log('Home -> render')

    const [name, setName] = useState('')
    const [view, setView] = useState('')
    const [postListRefreshStamp, setPostListRefreshStamp] = useState(0)

    const navigate = useNavigate()
    
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
    const scrollTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
    }

    return <View>
        <div className='Title'><Header>
        <div className="Home"><Heading level="1"><Link to="/">SocialCode</Link></Heading></div>
        </Header></div>

        <div className="Welcome"><Header>
        <Heading level="3">👋 Welcome {name} !!</Heading>
        </Header></div>

        <div className='Fixed'><Header>
        <div className="Logout"><Button onClick={handleLogout}>😴</Button></div>
        </Header></div>


        <View tag="main">
        <Routes>
                <Route path="/" element={<PostList refreshStamp={postListRefreshStamp} />} />

                <Route path="/about" element={<About />} />

                <Route path="/hello/:to" element={<Hello />} />

                <Route path="/search" element={<Search />} />
            </Routes>

        {view === 'create-post' && <CreatePostForm onCancelCreatePostClick={handleCancelCreatePostClick} onPostCreated={handlePostCreated} />}
        </View>
            
        <Footer onCreatePostClick={handleCreatePostClick} onClickScrollTop={scrollTop}/>
        <div className='About'><Link to="/about">About</Link></div>
        </View>
}

export default Home