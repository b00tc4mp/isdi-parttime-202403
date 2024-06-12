import { useState, useEffect } from 'react'
import Title from '../components/core/Title'
import View from '../components/library/View'
import Header from './components/Header'
import Button from '../components/core/Button'
import logic from '../logic'
import Heading from '../components/core/Heading'
import PostList from './components/PostList'
import Footer from './components/Footer'

function Home({ onUserLoggedOut }) {
    console.log('Home -> render')

    const [name, setName] = useState('')
    const [view, setView] = useState('')

    const handleLogout = () => {
        logic.logoutUser()

        onUserLoggedOut()
    }

    useEffect(() => {
        try {
            logic.getUserName((error, name) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                setName(name)
            })

        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    const handleCreatePostClick = () => setView('create-post')

    const handleCancelCreatePost = () => setView('')

    return <View>
        <Header>
            <Heading level="3">{name}</Heading>
            <Button onClick={handleLogout}>Logout</Button>
        </Header>
        <View tag='main'>
            <PostList />

            {view === 'create-post' && <form class="Form FormWithFeedback CreatePostForm">
                <div class="Field FormInput">
                    <label for="title">Title</label>
                    <input class="Input" id="username" type="text" placeholder="title" />
                </div>

                <div class="Field FormInput">
                    <label for="image">Image</label>
                    <input class="Input" id="username" type="text" placeholder="image" />
                </div>
                <div class="Field description-input">
                    <label for="description">Description</label>
                    <input class="Input" id="username" type="text" placeholder="description" />
                </div>

                <button class="Button" type="button" onClick={handleCancelCreatePost}>Cancel</button>
                <button class="Button SubmitButton" type="submit">Create</button>
            </form>}

        </View>
        <Footer onCreatePostClick={handleCreatePostClick} />


    </View>
}

export default Home