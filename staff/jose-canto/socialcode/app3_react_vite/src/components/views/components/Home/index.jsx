import { useState, useEffect } from "react"
import { Routes, Route, useNavigate, Link } from "react-router-dom"

import logic from "../../../../logic"

import View from "../../../library/View"
import Heading from "../../../core/Heading"
import Header from "../Header"
import Button from "../../../core/Button"
import PostList from "../PostList"
import Footer from "../../../core/Footer"
import CreatePostForm from "../CreatePostForm"
import About from "../About"

import "./index.css"
import "../CreatePostForm"

import "../../../core/TextArea.css"

function Home() {
  const navigate = useNavigate()

  console.log("Home --> render")

  const [name, setName] = useState("")
  const [viewCreatePostForm, setViewCreatePostForm] = useState("")
  const [postListRefresh, setPostListRefresh] = useState(0)

  const handleLogout = () => {
    logic.logoutUser()

    navigate("/login")
  }

  useEffect(() => {
    console.log("Home --> UseEffect")
    try {
      // prettier-ignore
      logic.getUserName(name)
        .then((name) => {
          console.log("Home --> setName")
          setName(name)
        })
        .catch((error) => {
          console.error(error.message)

          alert(error.message)
        })
    } catch (error) {
      console.error(error.message)

      alert(error.message)
    }
  }, [])

  const handleCreatePostClick = () => setViewCreatePostForm("create-post")
  const handleCancelCreatePost = () => setViewCreatePostForm("")
  const handleCreatePost = () => {
    setPostListRefresh(Date.now())
    setViewCreatePostForm("")
  }

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <>
      <Header>
        <Heading level="3">{name}</Heading>
        <Link to="/about">About</Link>
        <Button onClick={handleLogout} className="LogoutButton">
          Logout
        </Button>
      </Header>

      <View className="View">
        <Routes>
          <Route path="/" element={<PostList refreshStamp={postListRefresh} />} />
          <Route path="/about" element={<About />} />
        </Routes>

        {viewCreatePostForm === "create-post" && (
          <CreatePostForm
            onCancelCreatedPostClick={handleCancelCreatePost}
            onPostCreated={handleCreatePost}
            onClickScrollTop={scrollTop}
          />
        )}
      </View>

      <Footer onCreatePostClick={handleCreatePostClick} onClickScrollTop={scrollTop} />
    </>
  )
}

export default Home
