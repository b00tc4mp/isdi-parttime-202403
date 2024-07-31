import { useState } from 'react'
import Field from './Field'

function Main({ onSearchClick }) {
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const allSuggestions = [
    'Magos',
    'Músicos',
    'Musicos',
    'Humoristas',
    'Bailarines',
    'Pintores',
    'Malabaristas',
    'Zancudos',
    'Lanzafuegos',
    'Cantantes',
    'Grupos musicales',
    'Fotografos',
    'Tatuadores',
    'Maquilladores',
    'Payasos',
    'Clowns',
  ]

  const handleInputChange = (event) => {
    const value = event.target.value
    setInputValue(value)

    if (value.length > 0) {
      const filteredSuggestions = allSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(value.toLowerCase())
      )
      setSuggestions(filteredSuggestions)
    } else {
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion)
    setSuggestions([])
  }
  return (
    <main className='flex flex-col gap-5'>
      <p className='text-white mt-5 mx-2 text-center'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima ipsam
        laboriosam optio unde officiis tenetur voluptates dignissimos, vero
        molestiae commodi fugit error sit ipsum nihil. Tenetur aspernatur
        voluptatem porro sit?
      </p>

      <form className='flex flex-col gap-5' action=''>
        <Field
          labelClass='text-white'
          labelChildren='Artista'
          htmlFor='artista'
          id='artista'
          type='text'
          value={inputValue}
          inputClass='h-8 rounded p-2'
          onChange={handleInputChange}
          placeholder='musicos, humoristas, magos...'
          divClass='Field flex flex-col gap-1 mx-2'
        ></Field>

        {suggestions.length > 0 && (
          <ul className='relative border border-gray-300 border-t-0 max-h-[150px] overflow-y-auto bg-white w-[100%] z-50'>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className='p-2 cursor-pointer hover:bg-gray-200'
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}

        <Field
          labelClass='text-white'
          labelChildren='Ciudad del Evento'
          htmlFor='ciudad'
          id='ciudad'
          type='text'
          inputClass='h-8 rounded p-2'
          placeholder='Ciudad del evento'
          divClass='Field flex flex-col gap-1 mx-2'
        ></Field>

        <Field
          labelClass='text-white'
          labelChildren=' Fecha del Evento'
          htmlFor='fecha'
          id='fecha'
          type='date'
          inputClass='h-8 rounded p-2'
          divClass='Field flex flex-col gap-1 mx-2'
        ></Field>
      </form>
    </main>
  )
}

export default Main
