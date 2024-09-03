import React from "react"
import View from "../../components/library/View"
import SearchFunctionality from "../components/SearchFunctionality"
import Heading from "../../components/core/Heading"

function SearchView() {
  return (
    <View className="search-view">
      <Heading level="1" className="text-center mb-6">
        Search Recipes
      </Heading>
      <SearchFunctionality />
    </View>
  )
}
export default SearchView
