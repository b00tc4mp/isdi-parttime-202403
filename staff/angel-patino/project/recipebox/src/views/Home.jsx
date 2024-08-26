import { useState, useEffect } from "react"
import View from "../components/library/View"
import Header from "./components/Header"
import Heading from "../components/core/Heading"
import Button from "../components/core/Button"
import EditRecipeForm from "./components/EditRecipeForm"
import Footer from "./components/Footer"
import CreateRecipeForm from "../views/components/CreateRecipeForm"
import RecipeList from "./components/RecipeList"
import logic from "../logic"

function Home({ onUserLoggedOut }) {
  const [name, setName] = useState("")
  const [view, setView] = useState("") // Manages the current view state
  const [editRecipeId, setEditRecipeId] = useState(null) // Manages the ID of the recipe being edited
  const [recipeListRefreshStamp, setRecipeListRefreshStamp] = useState(0) // Refreshes the recipe list when updated
  const [searchQuery, setSearchQuery] = useState("") // Stores the search query
  const [favoritesOnly, setFavoritesOnly] = useState(false) // Toggle to show only favorite recipes
  const [myRecipesOnly, setMyRecipesOnly] = useState(false) // Toggle to show only user's recipes

  useEffect(() => {
    logic
      .getUserName()
      .then((name) => setName(name))
      .catch((error) => alert(error.message))
  }, [])

  const handleLogout = () => {
    logic.logoutUser()
    onUserLoggedOut()
  }

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
    <View className="main-content">
      <Header>
        <Heading level="1">RecipeBox</Heading>
        <View direction="row">
          <Heading level="3">{name}</Heading>
          <Button onClick={handleLogout} className="text-primary-color">
            Logout
          </Button>
        </View>
      </Header>

      <View tag="main" className="p-4 pb-16">
        {editRecipeId ? (
          <EditRecipeForm
            recipeId={editRecipeId}
            onCancelEditRecipeClick={handleCancelEditRecipeClick}
            onRecipeUpdated={handleRecipeUpdated}
          />
        ) : (
          <RecipeList
            refreshStamp={recipeListRefreshStamp}
            searchQuery={searchQuery}
            showFavorites={favoritesOnly}
            showMyRecipes={myRecipesOnly}
            onEditRecipeClick={handleEditRecipeClick}
          />
        )}
      </View>

      {view === "create-recipe" && (
        <CreateRecipeForm
          onCancelCreateRecipeClick={handleCancelCreateRecipeClick}
          onRecipeCreated={handleRecipeCreated}
        />
      )}

      <Footer
        onCreateRecipeClick={handleCreateRecipeClick}
        onHomeClick={() => setView("")}
        onFavoritesClick={handleFavoritesToggle}
        onSearchClick={() => setView("search")}
        onMyRecipesClick={handleMyRecipesToggle}
      />
    </View>
  )
}

export default Home
