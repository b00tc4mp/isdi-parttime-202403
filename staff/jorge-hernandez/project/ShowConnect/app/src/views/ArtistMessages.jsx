import Header from '../components/Header'

function ArtistMessages({ onClickBack }) {
  return (
    <>
      <div className='flex flex-col gap-3 justify-center text-xl border rounded-lg m-2 mt-10 bg-blue-400 shadow-lg shadow-black'>
        <i
          onClick={onClickBack}
          className='text-white fa-solid fa-house cursor-pointer m-2'
        ></i>
        <div className='m-7'>
          <h1 className='mb-4 text-white text-2xl text-center'>Mensajes</h1>
          <ul className='flex flex-col gap-4'>
            <li className='text-white'>Mensaje1</li>
            <li className='text-white'>Mensaje2</li>
            <li className='text-white'>Mensaje3</li>
            <li className='text-white'>Mensaje4</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default ArtistMessages
