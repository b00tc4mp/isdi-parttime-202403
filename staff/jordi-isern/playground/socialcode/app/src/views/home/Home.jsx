import { useEffect, useState } from "react"

import {Routes, Route ,useNavigate, Link} from 'react-router-dom'

import Button from "../../Components/Core/Button";
import View from "../../Components/Library/View";
import Header from "./components/Header";
import Heading from "../../Components/Core/Heading";
import PostList from "./components/PostList";
import Footer from "./components/Footer";
import CreatePostForm from "./components/CreatePostForm";
import About from "./components/About"
import Search from "./components/Search";

import logic from "../../logic";

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
            <Heading level ='1'><Link to="/">SocialCode</Link></Heading>

            <View direction="row">
                <Heading level="3">{name}</Heading>

                <Link to="/about">About</Link>

                <Button onClick={handleLogout}>Logout</Button>
            </View>
        </Header>

        <View tag="main">
            <Routes>
                <Route path="/" element={<PostList refreshStamp={postListRefreshStamp}/> }/>

                <Route path="/about" element={<About />} />

                <Route path="/hello/:to" element={<Search />} />
            </Routes>
        </View>

        {view === 'create-post' && <CreatePostForm onCancelCreatePostClick={handleCancelCreatePostClick} onPostCreated={handlePostCreated} />}

        <Footer onCreatePostClick={handleCreatePostClick} />
    </View>
}

export default Home