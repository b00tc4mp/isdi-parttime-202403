import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import View from "../components/library/View"
import Header from "./components/Header"
import RecipeList from "./components/RecipeList"
import Footer from "./components/Footer"
import CreateRecipeForm from "./components/CreateRecipeForm"
import EditRecipeForm from "./components/EditRecipeForm"
import Button from "../components/core/Button"
import Heading from "../components/core/Heading"
import logic from "../logic"
import About from "./components/About"
import FavoritesList from "./components/FavoritesList" // Newly added
import SearchFunctionality from "./components/SearchFunctionality" // Newly added

function Home({ onUserLoggedOut }) {
  const [name, setName] = useState("")
  const [view, setView] = useState("")
  const [recipeListRefreshStamp, setRecipeListRefreshStamp] = useState(0)
  const [searchQuery, setSearchQuery] = useState("") // Search state
  const [favoritesOnly, setFavoritesOnly] = useState(false) // Favorites state
  const [editRecipeId, setEditRecipeId] = useState(null) // Edit recipe state
  const [myRecipesOnly, setMyRecipesOnly] = useState(false)

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

  const handleEditRecipeClick = (recipeId) => setEditRecipeId(recipeId)
  const handleCancelEditRecipeClick = () => setEditRecipeId(null)
  const handleRecipeUpdated = () => {
    setRecipeListRefreshStamp(Date.now())
    setEditRecipeId(null)
  }

  const handleSearchQueryChange = (query) => setSearchQuery(query)
  const handleFavoritesToggle = () => setFavoritesOnly((prev) => !prev)
  const handleMyRecipesToggle = () => setMyRecipesOnly((prev) => !prev)

  return (
    <View>
      <Header>
        <Heading level="1">RecipeBox</Heading>
        <View direction="row">
          <Heading level="3">{name}</Heading>
          <Button onClick={handleLogout}>Logout</Button>
        </View>
      </Header>

      <SearchFunctionality onSearch={handleSearchQueryChange} />
      <View direction="row">
        <Button onClick={handleFavoritesToggle}>
          {favoritesOnly ? "Show All" : "Show Favorites"}
        </Button>
        <Button onClick={handleMyRecipesToggle}>
          {myRecipesOnly ? "Show All" : "My Recipes"}
        </Button>
      </View>

      <View tag="main">
        {editRecipeId ? (
          <EditRecipeForm
            recipeId={editRecipeId}
            onCancelEditRecipeClick={handleCancelEditRecipeClick}
            onRecipeUpdated={handleRecipeUpdated}
          />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <RecipeList
                  refreshStamp={recipeListRefreshStamp}
                  searchQuery={searchQuery}
                  showFavorites={favoritesOnly}
                  showMyRecipes={myRecipesOnly}
                  onEditRecipeClick={handleEditRecipeClick}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/favorites" element={<FavoritesList />} />
          </Routes>
        )}

        {view === "create-recipe" && (
          <CreateRecipeForm
            onCancelCreateRecipeClick={handleCancelCreateRecipeClick}
            onRecipeCreated={handleRecipeCreated}
          />
        )}
      </View>

      <Footer
        onCreateRecipeClick={handleCreateRecipeClick}
        onHomeClick={() => setView("")}
        onFavoritesClick={handleFavoritesToggle}
        onMyRecipesClick={handleMyRecipesToggle}
        onSearchClick={handleSearchQueryChange}
      />
    </View>
  )
}

export default Home
