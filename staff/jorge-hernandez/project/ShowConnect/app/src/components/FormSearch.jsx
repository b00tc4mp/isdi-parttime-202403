import { useState } from 'react'
import Field from './core/Field'
import Footer from './Footer'
import ArtistsList from './ArtistsList'
import { disciplines, cities } from '../assets/disciplines'

function FormSearch({ onClickGoToLogin }) {
  const [inputValue, setInputValue] = useState('')
  const [disciplineSuggestions, setDisciplineSuggestions] = useState([])
  const [cityInputValue, setCityInputValue] = useState('')
  const [citySuggestions, setCitySuggestions] = useState([])
  const [artist, setArtist] = useState('')
  const [city, setCity] = useState('')
  const [excludedDate, setExcludedDate] = useState('')
  const [message, setMessage] = useState('')

  const handleDisciplineInputChange = (e) => {
    const value = e.target.value
    setInputValue(value)

    if (value.length > 0) {
      const filteredSuggestions = disciplines.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(value.toLowerCase())
      )
      setDisciplineSuggestions(filteredSuggestions)
    } else {
      setDisciplineSuggestions([])
    }
  }

  const handleDisciplineSuggestionClick = (suggestion) => {
    setInputValue(suggestion)
    setDisciplineSuggestions([])
  }

  const handleCityInputChange = (e) => {
    const value = e.target.value
    setCityInputValue(value)

    if (value.length > 0) {
      const filteredSuggestions = cities.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(value.toLowerCase())
      )
      setCitySuggestions(filteredSuggestions)
    } else {
      setCitySuggestions([])
    }
  }

  const handleCitySuggestionClick = (suggestion) => {
    setCityInputValue(suggestion)
    setCitySuggestions([])
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    const form = e.target

    const artist = form.artista.value.toLowerCase()
    const city = form.ciudad.value.toLowerCase()
    const excludedDate = form.fecha.value

    try {
      setArtist(artist)
      setCity(city)
      setExcludedDate(excludedDate)

      // setInputValue('')
      // setCityInputValue('')
    } catch (error) {
      setMessage(error.message)
      setTimeout(() => {
        setMessage('')
      }, 2000)
    }
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
          onChange={handleDisciplineInputChange}
          placeholder='musicos, humoristas, magos...'
          divClass='Field flex flex-col gap-1 mx-2'
        ></Field>

        {disciplineSuggestions.length > 0 && (
          <ul className='relative border border-gray-300 border-t-0 max-h-[150px] overflow-y-auto bg-white w-[100%] z-50'>
            {disciplineSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleDisciplineSuggestionClick(suggestion)}
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
          value={cityInputValue}
          inputClass='h-8 rounded p-2'
          onChange={handleCityInputChange}
          placeholder='Ciudad del evento'
          divClass='Field flex flex-col gap-1 mx-2'
        ></Field>

        {citySuggestions.length > 0 && (
          <ul className='relative border border-gray-300 border-t-0 max-h-[150px] overflow-y-auto bg-white w-[100%] z-50'>
            {citySuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleCitySuggestionClick(suggestion)}
                className='p-2 cursor-pointer hover:bg-gray-200'
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}

        <Field
          labelClass='text-white'
          labelChildren='Fecha del Evento'
          htmlFor='fecha'
          id='fecha'
          type='date'
          inputClass='h-8 rounded p-2'
          divClass='Field flex flex-col gap-1 mx-2'
        ></Field>
        <p className='text-red-600 text-lg m-auto'>{message}</p>
        <Footer>Buscar</Footer>
      </form>

      <ArtistsList
        onClickGoToLogin={onClickGoToLogin}
        artist={artist}
        city={city}
        excludedDate={excludedDate}
      />
    </main>
  )
}

export default FormSearch
