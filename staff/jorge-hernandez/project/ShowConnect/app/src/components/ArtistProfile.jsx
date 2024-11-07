import { useState } from 'react'
import RegisterClient from './RegisterClient'
import Button from './core/Button'

function ArtistProfile({ artist, onClose, onClickGoToLogin }) {
  const [sendMessage, setSendMessage] = useState(false)

  const handleClickContact = () => {
    setSendMessage(true)
  }

  return (
    <>
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60'>
        <div className='bg-gray-800 text-white rounded-lg p-6 w-full max-w-4xl relative'>
          <Button onClick={onClose} className='absolute top-4 right-4 text-2xl'>
            &times;
          </Button>

          <div className='flex flex-col justify-center'>
            {sendMessage ? (
              <RegisterClient
                onClickGoToLogin={onClickGoToLogin}
                artistId={artist.id}
              />
            ) : (
              <>
                <h1 className='text-white text-xl m-3'>
                  {artist.artisticName}
                </h1>
                <p className='text-white text-sm m-3'>{artist.description}</p>

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
                <h2>Fechas ocupadas</h2>
                <ul className='m-3 flex flex-col gap-2'>
                  {artist.dates.sort().map((date, index) => (
                    <li key={index} className='flex items-center'>
                      <span className='flex-1'>{date}</span>
                    </li>
                  ))}
                </ul>
                <Button onClick={handleClickContact}>
                  Contacta con {artist.artisticName}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ArtistProfile
