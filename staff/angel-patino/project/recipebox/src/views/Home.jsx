import { useState, useEffect } from "react"

import { Routes, Route, Link } from "react-router-dom"

import View from "../components/library/View"

import Header from "./components/Header"
import RecipeList from "./components/RecipeList"
import Footer from "./components/Footer"
import CreateRecipeForm from "./components/CreateRecipeForm"

import Button from "../components/core/Button"
import Heading from "../components/core/Heading"

import logic from "../logic"
import About from "./components/About"

function Home({ onUserLoggedOut }) {
  const [name, setName] = useState("")
  const [view, setView] = useState("")
  const [recipeListRefreshStamp, setRecipeListRefreshStamp] = useState(0)

  const handleLogout = () => {
    logic.logoutUser()

    onUserLoggedOut()
  }

  useEffect(() => {
    try {
      logic
        .getUserName()
        .then((name) => {
          setName(name)
        })
        .catch((error) => {
          console.error(error)

          alert(error.message)
        })
    } catch (error) {
      console.error(error)

      alert(error.message)
    }
  }, [])

  const handleCreateRecipeClick = () => setView("create-recipe")

  const handleCancelCreateRecipeClick = () => setView("")

  const handleRecipeCreated = () => {
    setRecipeListRefreshStamp(Date.now())

    setView("")
  }

  return (
    <View>
      <Header>
        <Heading level="1">
          <Link to="/">RecipeBox</Link>
        </Heading>

        <View direction="row">
          <Heading level="3">{name}</Heading>

          <Link to="/about">About</Link>

          <Button onClick={handleLogout}>Logout</Button>
        </View>
      </Header>

      <View tag="main">
        <Routes>
          <Route
            path="/"
            element={<RecipeList refreshStamp={recipeListRefreshStamp} />}
          />

          <Route path="/about" element={<About />} />

          {/* <Route path="/hello/:to" element={<Hello />} />

          <Route path="/search" element={<Search />} /> */}
        </Routes>

        {view === "create-post" && (
          <CreateRecipeForm
            onCancelCreateRecipeClick={handleCancelCreateRecipeClick}
            onRecipeCreated={handleRecipeCreated}
          />
        )}
      </View>

      <Footer onCreateRecipeClick={handleCreateRecipeClick} />
    </View>
  )
}

export default Home
