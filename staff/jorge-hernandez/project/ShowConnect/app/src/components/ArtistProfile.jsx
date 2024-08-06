import { useEffect, useState } from 'react'

function ArtistProfile({ artist, onClose }) {
  const [name, setName] = useState('')

  useEffect(() => {
    if (artist) {
      setName(artist.artisticName)
    }
  }, [artist])

  if (!artist) {
    return null
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60'>
      <div className='bg-gray-800 text-white rounded-lg p-6 w-full max-w-4xl relative'>
        <button className='absolute top-4 right-4 text-2xl' onClick={onClose}>
          &times;
        </button>

        <div className='flex flex-col justify-center'>
          <h1 className='text-white text-xl m-3'>{artist.artisticName}</h1>
          <p className='text-white text-sm m-3'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est nam,
            aut quas esse deleniti autem nemo sunt temporibus non explicabo iure
            expedita sint repellendus voluptatibus unde. Quos quia earum soluta
            rerum, doloremque perferendis, quas blanditiis cum porro quam
            dolorem repellendus.
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

          <button className='h-10 mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-0 font-medium border-none text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md shadow-md'>
            Contacta con {name}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ArtistProfile
