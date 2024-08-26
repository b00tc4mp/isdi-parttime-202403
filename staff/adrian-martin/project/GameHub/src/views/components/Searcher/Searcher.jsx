import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import { useState } from 'react'

import './Searcher.css'

const Searcher = ({ onSearch }) => {
    const [query, setQuery] = useState('')

    const handleChange = event => {
        const newValue = event.target.value
        setQuery(newValue)
        onSearch(newValue)
    }

    return (
        <div className='Searcher'>
            <div className='Searcher-text-icon'>
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search game ..."
                    className='Text'
                />
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
        </div>
    )
}

export default Searcher