import React from "react"
import View from "../../components/library/View"
import Heading from "../../components/core/Heading"
import FavoritesList from "./FavoritesList"

function FavoritesView() {
  return (
    <View className="favorites-view">
      <Heading level="1" className="text-center mb-6">
        Your favorite Recipes
      </Heading>
      <FavoritesList />
    </View>
  )
}

export default FavoritesView
