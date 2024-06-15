import { useState, useEffect } from 'react'

import View from '../components/library/View'
import './Home.css'
import Header from './components/Header'
import Button from '../components/core/Button'
import PostList from '../views/components/PostList'
import logic from '../logic'
import Footer from './components/Footer'
import Heading from '../components/core/Heading'
import CreatePostForm from './components/CreatePostForm'

function Home({ onUserLoggedOut, onCreatePostClick }) {
  console.log('Home -> render')

  const [name, setName] = useState('')
  const [view, setView] = useState('')
  const [postListRefreshStamp, setPostListRefreshStamp] = useState(0)

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
      console.log(error)
    }
  }, [])

  const handleLogout = () => {
    logic.logoutUser()
    onUserLoggedOut()
  }

  const handleCreatePostClick = () => setView('create-post')
  const handleCancelCreatePostClick = () => setView('')
  const handleOnPostCreated = () => {
    setPostListRefreshStamp(Date.now())
    setView('')
  }

  return (
    <View>
      <Header>
        <Heading level='3'>{name}</Heading>
        <Button onClick={handleLogout}>Logout</Button>
      </Header>

      <View tag='main'>
        <PostList refreshStamp={postListRefreshStamp} />

        {view === 'create-post' && (
          <CreatePostForm
            onCancelCreatePostClick={handleCancelCreatePostClick}
            onPostCreated={handleOnPostCreated}
          />
        )}
      </View>

      <Footer onCreatePostClick={handleCreatePostClick} />
    </View>
  )
}

export default Home
