import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import { useState } from 'react'

import './Searcher.css'

const Searcher = ({ onSearch }) => {
    const [query, setQuery] = useState('')

    const handleChance = event => {
        const newValue = event.target.value
        setQuery(newValue)
        onSearch(newValue)
    }

    const handleSearch = () => {
        onSearch(query)
    }

    return (
        <div className='Searcher'>
            <div className='Searcher-text-icon'>
                <input
                    type="text"
                    value={query}
                    onChange={handleChance}
                    placeholder="Search game ..."
                    className='Text'
                />
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
        </div>
    )
}

export default Searcher