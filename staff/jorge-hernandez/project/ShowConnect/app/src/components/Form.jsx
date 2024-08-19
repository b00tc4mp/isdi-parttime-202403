import { useState } from 'react'
import Field from './Field'
import Footer from './Footer'
import ArtistsList from './ArtistsList'
import { disciplines } from '../assets/disciplines'
import validate from 'com/validate'

function Form() {
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [artist, setArtist] = useState('')
  const [city, setCity] = useState('')
  const [excludedDate, setExcludedDate] = useState('')
  const [message, setMessage] = useState('')

  const handleInputChange = (e) => {
    const value = e.target.value
    setInputValue(value)

    if (value.length > 0) {
      const filteredSuggestions = disciplines.filter((suggestion) =>
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

  const handleOnSubmit = (e) => {
    e.preventDefault()

    const form = e.target

    const artist = form.artista.value.toLowerCase()
    const city = form.ciudad.value.toLowerCase()
    const excludedDate = form.fecha.value

    try {
      validate.name(artist, 'artist')
      validate.text(city, 'city')

      if (!excludedDate) {
        throw new Error('date is empty')
      }
    } catch (error) {
      setMessage(error.message)
      setTimeout(() => {
        setMessage('')
      }, 2000)
    }

    setArtist(artist)
    setCity(city)
    setExcludedDate(excludedDate)

    form.reset()
    setInputValue('')
  }

  return (
    <main className='flex flex-col gap-5'>
      <p className='text-white mt-5 mx-2 text-center'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima ipsam
        laboriosam optio unde officiis tenetur voluptates dignissimos, vero
        molestiae commodi fugit error sit ipsum nihil. Tenetur aspernatur
        voluptatem porro sit?
      </p>

      <form onSubmit={handleOnSubmit} className='flex flex-col gap-5'>
        <Field
          labelClass='text-white'
          labelChildren='¿Qué tipo de artista buscas?'
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
        <p className='text-red-600 text-lg m-auto'>{message}</p>
        <Footer>Buscar</Footer>
      </form>

      <ArtistsList artist={artist} city={city} excludedDate={excludedDate} />
    </main>
  )
}

export default Form
