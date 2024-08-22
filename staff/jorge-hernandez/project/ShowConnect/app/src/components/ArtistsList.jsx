import { useState, useEffect } from 'react'
import logic from '../logic'

import ArtistResult from './ArtistResult'
import ArtistProfile from './ArtistProfile'

function ArtistsList({ artist, city, excludedDate, onClickGoToLogin }) {
  const [artists, setArtists] = useState([])
  const [selectedArtist, setSelectedArtist] = useState(null)

  useEffect(() => {
    if (artist && city && excludedDate) {
      loadArtists(artist, city, excludedDate)
    }
  }, [artist, city, excludedDate])

  const loadArtists = (artist, city, excludedDate) => {
    try {
      logic
        .getArtistsByCity(artist, city, excludedDate)
        .then((artists) => {
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
        <h1
          className={`m-auto text-2xl ${
            artists.length === 0 ? 'text-red-500' : 'text-white'
          }`}
        >
          {artists.length === 0
            ? 'No se han encontrado artistas'
            : 'Resultados de la búsqueda'}
        </h1>
      )}
      <div>
        {artists.map((artist, index) => (
          <ArtistResult
            key={index}
            artisticName={artist.artisticName}
            description={artist.description}
            image={artist.image}
            onClickProfile={() => handleArtistClick(artist)}
          />
        ))}
      </div>

      {selectedArtist && (
        <div>
          <ArtistProfile
            onClickGoToLogin={onClickGoToLogin}
            artist={selectedArtist}
            onClose={handleCloseProfile}
          />
        </div>
      )}
    </>
  )
}

export default ArtistsList
