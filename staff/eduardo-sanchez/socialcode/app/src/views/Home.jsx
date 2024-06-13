import { useState, useEffect } from 'react'

import View from '../components/library/View'

import Header from './components/Header'
import PostList from './components/PostList'
import Footer from './components/Footer'

import Button from '../components/core/Button'
import Heading from '../components/core/Heading'

import logic from '../logic'

function Home({ onUserLoggedOut }) {
    console.log('Home -> render')

    const [name, setName] = useState('')
    const [view, setView] = useState('')

    const handleLogout = () => {
        logic.logoutUser()

        onUserLoggedOut()
    }

    useEffect(() => {
        console.log('Home -> useEffect')
        // setTimeout(() => {
        try {
            logic.getUserName((error, name) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                console.log('Home -> setName')

                setName(name)
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
        // }, 10000)
    }, [])

    const handleCreatePostClick = () => setView('create-post')

    const handleCancelCreatePostClick = () => setView('')

    return <View>
        <Header>
            <Heading level="3">{name}</Heading>
            <Button onClick={handleLogout}>Logout</Button>
        </Header>

        <View tag="main">
            <PostList />

            {view === 'create-post' && <form className="Form FormWithFeedback CreatePostForm">
                <div className="Field">
                    <label htmlFor="title">Title</label>
                    <input className="Input" id="title" type="text" placeholder="title" />
                </div>
                <div className="Field">
                    <label htmlFor="image">Image</label>
                    <input className="Input" id="image" type="text" placeholder="image" />
                </div>
                <div className="Field">
                    <label htmlFor="description">Description</label>
                    <input className="Input" id="description" type="text" placeholder="description" />
                </div>
                <button className="Button" type="button" onClick={handleCancelCreatePostClick}>Cancel</button>
                <button className="Button SubmitButton" type="submit">Create</button>
                <p className="Feedback">image is not valid, correct it</p>
            </form>}
        </View>

        <Footer onCreatePostClick={handleCreatePostClick} />
    </View>
}

export default Home