import React from "react"
import RecipeList from "../components/RecipeList"
import Title from "../../components/core/Title"

function HomeView() {
  return (
    <div>
      <Title>All Recipes</Title>
      <RecipeList />
    </div>
  )
}

export default HomeView
