import React from "react"
import CreateRecipeForm from "../components/CreateRecipeForm"
import View from "../../components/library/View"
import Heading from "../../components/core/Heading"
import { useNavigate } from "react-router-dom"

function CreateRecipeView() {
  const navigate = useNavigate()

  const handleRecipeCreated = () => {
    navigate("/")
  }

  const handleCancelCreateRecipeClick = () => {
    navigate(-1)
  }

  return (
    <View className="create-recipe-view">
      <Heading level="1" className="text-center mb-6">
        Create a New Recipe
      </Heading>
      <CreateRecipeForm
        onRecipeCreated={handleRecipeCreated}
        onCancelCreateRecipeClick={handleCancelCreateRecipeClick}
      />
    </View>
  )
}

export default CreateRecipeView
