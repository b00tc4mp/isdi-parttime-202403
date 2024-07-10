import { useState, useEffect } from 'react'

import View from '../library/View'

import PrincipalBar from '../core/PrincipalBar'
import PostList from '../Views/components/PostList'
import Footer from '../Views/components/Footer'
import CreatePostView from '../Views/components/CreatePostView'

import logic from '../../logic'

function Home({ onUserLoggedOut }) {
  const [name, setName] = useState('')
  const [view, setView] = useState('')
  const [postListRefreshStamp, setPostListRefreshStamp] = useState(0)

  const handleLogout = () => {
    logic.logoutUser()

    onUserLoggedOut()
  }

  useEffect(() => {
    try {
      logic.getUserName()
        .then((name) => { setName(name) })
        .catch(error => {
          alert(error.message)

          return
        })

    } catch (error) {
      console.error(error)

      alert(error.message)
    }
  }, []) 

  const handleCreatePostClick = () => setView('create-post')

  const handleCancelCreatePostClick = () => setView('')

  const handlePostCreated = () => {
    setPostListRefreshStamp(Date.now)

    setView('')
  }

  return <View>
    <PrincipalBar name={name} onClick={handleLogout} children={"Logout"}></PrincipalBar>

    <View tag="main">

      <PostList refreshStamp={postListRefreshStamp} />
      {view === 'create-post' && (<>
        <div className="modal-backdrop" onClick={handleCancelCreatePostClick}></div>
        <div className="modal">
          <CreatePostView
            onCancelCreatePostClick={handleCancelCreatePostClick}
            onPostCreated={handlePostCreated}
          />
        </div>
      </>
      )}
    </View>
    <Footer onCreatePostClick={handleCreatePostClick}></Footer>
  </View>
}

export default Home