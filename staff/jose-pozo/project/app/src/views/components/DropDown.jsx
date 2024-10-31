import React, { useState } from 'react'

import Picture from '../../components/core/Picture'

function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button onClick={toggleDropdown}>
                <Picture src={'../../public/profile-icon.webp'} alt={'profile icon'} />
            </button>
            {isOpen && (
                <ul>
                    <li>Opción 1</li>
                    <li>Opción 2</li>
                    <li>Opción 3</li>
                </ul>
            )}
        </div>
    );
}

export default Dropdown;
