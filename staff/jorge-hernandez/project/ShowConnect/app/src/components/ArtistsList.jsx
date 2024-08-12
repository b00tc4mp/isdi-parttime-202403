import logic from '../logic'

import { useState, useEffect } from 'react'

import ArtistResult from './ArtistResult'
import ArtistProfile from './ArtistProfile'

function ArtistsList({ artist, city, excludedDate }) {
  const [artists, setArtists] = useState([])
  const [selectedArtist, setSelectedArtist] = useState(null)

  useEffect(() => {
    if (artist && city && excludedDate) {
      loadArtists(artist, city, excludedDate)
    }
  }, [artist, city, excludedDate])

  const loadArtists = (artist, city, excludedDate) => {
    //TODO modificar mensaje cuando no se encuentran artistas
    try {
      logic
        .getArtistsByCity(city, artist, excludedDate)
        .then((artists) => {
          if (artists.length === 0) {
            alert('No se encontraron artistas')
          }

          setArtists(artists)
        })
        .catch((error) => {
          console.error(error)

          alert(error.message)
        })
    } catch (error) {
      console.error(error)

      alert(error.message)
    }
  }

  const handleArtistClick = (artist) => {
    setSelectedArtist(artist)
  }
  const handleCloseProfile = () => {
    setSelectedArtist(null)
  }
  return (
    <>
      {artist && city && (
        <h1 className='text-white m-auto text-2xl'>
          Resultados de la búsqueda
        </h1>
      )}
      <div>
        {artists.map((artist, index) => (
          <ArtistResult
            key={index}
            artisticName={artist.artisticName}
            description={artist.description}
            images={artist.images}
            onClickProfile={() => handleArtistClick(artist)}
          />
        ))}
      </div>

      {selectedArtist && (
        <div>
          <ArtistProfile artist={selectedArtist} onClose={handleCloseProfile} />
        </div>
      )}
    </>
  )
}
export default ArtistsList
