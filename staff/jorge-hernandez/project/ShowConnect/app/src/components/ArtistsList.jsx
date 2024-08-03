import logic from '../logic'

import { useState, useEffect } from 'react'

import ArtistResult from './ArtistResult'
import Header from './Header'

function ArtistsList({ refreshStamp }) {
  const [artists, setArtists] = useState([])

  useEffect(() => {
    loadArtists()
  }, [refreshStamp])

  const loadArtists = () => {
    try {
      logic
        .getArtistsByCity('madrid', 'humorista')
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

  return (
    <>
      <Header isArtistHomeVisible={true} loginButtonChildren='volver'>
        Artistas
      </Header>
      <div>
        {artists.map((artist) => (
          <ArtistResult
            key={artist.id}
            artisticName={artist.artisticName}
            description={artist.description}
            images={artist.images}
          />
        ))}
      </div>
    </>
  )
}
export default ArtistsList
