import { useState, useEffect } from "react"
import PostList from "./components/PostList.jsx"
import View from "../components/library/View.jsx"
import Header from "./components/Header.jsx"
import Button from "../components/core/Button.jsx"
import Heading from "../components/core/Heading.jsx"
import Footer from "./components/Footer.jsx"

import logic from "../logic.js"
import CreatePostForm from "./components/CreatePostForm"

function Home({ onUserLoggedOut }) {
  const [name, setName] = useState("")
  const [view, setView] = useState("")
  const [postListRefreshStamp, setPostListRefreshStamp] = useState(0)

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

  const handleCreatePostClick = () => setView("create-post")
  const handleCancelCreatePostClick = () => setView("")

  return (
    <View>
      <Header>
        <Heading level="2">{name}</Heading>
        <Button onClick={handleLogout}>Logout</Button>
      </Header>

      <View tag="main">
        <PostList refershStamp={postListRefreshStamp} />

        {view === "create-post" && (
          <CreatePostForm
            onCancelCreatePostClick={handleCancelCreatePostClick}
          />
        )}
      </View>

      <Footer onCreatePostClick={handleCreatePostClick}></Footer>
    </View>
  )
}

export default Home
