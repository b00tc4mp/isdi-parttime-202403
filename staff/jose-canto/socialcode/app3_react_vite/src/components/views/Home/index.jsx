import { useState, useEffect } from "react"
import { Routes, Route, useNavigate, Link } from "react-router-dom"

import logic from "../../../logic"

import View from "../../library/View"
import Heading from "../../core/Heading"
import Header from "../components/Header"
import Button from "../../core/Button"
import PostList from "../components/PostList"
import Footer from "../../core/Footer"
import CreatePostForm from "../components/CreatePostForm"
import About from "../components/About"
import Alert from "../components/Alert"

import "./index.css"
import "../components/CreatePostForm"
import "../../core/TextArea.css"

function Home() {
  const navigate = useNavigate()

  console.log("Home --> render")

  const [name, setName] = useState("")
  const [viewCreatePostForm, setViewCreatePostForm] = useState("")
  const [postListRefresh, setPostListRefresh] = useState(0)
  const [message, setMessage] = useState(null)

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

          //alert(error.message)
          setMessage(error.message)
        })
    } catch (error) {
      console.error(error.message)

      //alert(error.message)
      setMessage(error.message)
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

  const handleAlertAccepted = () => setMessage(null)

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

      {message && <Alert message={message} onAccept={handleAlertAccepted} />}
    </>
  )
}

export default Home
