import { useState } from "react";
import "./Filter.css"

export default function Filter({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("")

    const handleSearchChange = (event) => {
        const newSearchTerm = event.target.value
        setSearchTerm(newSearchTerm)
        onSearch(newSearchTerm)
    };

    return (
        <div className="Filter">
            <input
                type="text"
                placeholder="   🔎   Search by workout type "
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />
        </div>
    )
}

//<i className="fa-solid fa-magnifying-glass"></i>