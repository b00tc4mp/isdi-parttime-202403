import { IoSearchOutline } from "react-icons/io5"
import { useState } from "react"

import './SearchBar.css'

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('')

  const handleChange = (event) => {
    const newValue = event.target.value
    setQuery(newValue)
    onSearch(newValue)
  }

  return (
    <div className="SearchBarContent">
      <input
        value={query}
        type="text"
        onChange={handleChange}
        placeholder="¿A dónde quieres ir?"
        className="SearchBar"
      />
      <IoSearchOutline className="SearchIcon" />
    </div>
  )
}

export default SearchBar

