import { useState } from 'react'
import { FaChevronUp } from "react-icons/fa6"

const ImageSelect = ({ options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleOptionClick = (selectedValue) => {
        onChange(selectedValue)
        setIsOpen(false)
    }

    return (
        <div className="relative">
            <button
                type="button"
                className="flex items-center justify-between w-auto  p-2 bg-green-100 border border-green-800 shadow-lg"
                onClick={() => setIsOpen(!isOpen)}
            >
                <img src={value} alt="Selected Avatar" className="w-8 h-8 rounded-full" />
                <FaChevronUp className='rorate-180' />
            </button>
            {isOpen && (
                <div className="absolute bottom-full mb-2 w-full bg-green-100 border border-green-800 shadow-lg z-10 "
                >
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            className="flex items-center w-full p-2 hover:bg-green-100"
                            onClick={() => handleOptionClick(option.value)}
                        >
                            <img src={option.value} alt={option.label} className="w-8 h-8 rounded-full mr-2" />
                            <span>{option.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ImageSelect