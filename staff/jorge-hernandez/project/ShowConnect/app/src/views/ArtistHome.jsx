import { useEffect, useState } from 'react'
import logic from '../logic'
import Header from '../components/Header'

function ArtistHome() {
  const [artist, setArtist] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [newArtisticName, setNewArtisticName] = useState('')

  useEffect(() => {
    logic
      .getArtistData()
      .then((artistData) => {
        setArtist(artistData)
        setNewArtisticName(artistData.artisticName)
      })
      .catch((error) => {
        console.error('Error fetching artist data:', error)
      })
  }, [])

  const handleNameClick = () => {
    setIsEditing(true)
  }

  const handleNameChange = (event) => {
    setNewArtisticName(event.target.value)
  }

  const handleNameSave = () => {
    // if (!artist || !artist.id) {
    //   console.error('Artist ID is not defined')
    //   return
    // }

    const updatedData = { artisticName: newArtisticName }

    logic
      .updateArtistData(artist.id, updatedData)
      .then(() => {
        setArtist({ ...artist, artisticName: newArtisticName })
        setIsEditing(false)
      })
      .catch((error) => {
        console.error('Error updating artist data:', error)
      })
  }

  if (!artist) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header isArtistHomeVisible={true} loginButtonChildren='logout'>
        ShowConnect
      </Header>

      <div className='flex items-center justify-center bg-black bg-opacity-60'>
        <div className='bg-gray-700 text-white rounded-lg p-6 w-full max-w-4xl relative'>
          <div className='flex flex-col justify-center items-center'>
            {isEditing ? (
              <div>
                <input
                  type='text'
                  value={newArtisticName}
                  onChange={handleNameChange}
                  className='text-black p-2 rounded'
                />
                <button
                  className='ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-0 font-medium border-none text-sm px-5 py-2.5 mb-2 rounded-md shadow-md'
                  onClick={handleNameSave}
                >
                  Save
                </button>
              </div>
            ) : (
              <h1
                className='text-white text-3xl m-6 cursor-pointer'
                onClick={handleNameClick}
              >
                {artist.artisticName}
              </h1>
            )}
            <img
              className='w-40 h-40 object-cover shadow-black shadow-md border border-spacing-2 border-white'
              src={artist.image}
              alt='imágen de perfil'
            />
            <p className='text-white text-sm m-6 text-center'>
              {artist.description}
            </p>

            <div className='youtube-video flex justify-center my-6'>
              <iframe
                className='w-full max-w-xl h-72 md:h-96'
                width='560'
                height='315'
                src={artist.video}
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                title='YouTube video'
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ArtistHome
