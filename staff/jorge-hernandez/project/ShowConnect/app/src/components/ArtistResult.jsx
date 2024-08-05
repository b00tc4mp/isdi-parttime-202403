function ArtistResult(artist) {
  return (
    <>
      <div className='border border-e-white rounded-xl my-3 mx-2 shadow-2xl bg-blue-500'>
        <div className='flex my-3 justify-center'>
          <div className='flex flex-col items-center mx-4 '>
            <h1 className='text-white text-[40px] my-5'>
              {artist.artisticName}
            </h1>
            <img
              className='w-40 h-40 object-cover shadow-black shadow-md border border-spacing-2 border-white'
              src={artist.images}
              alt='imágen de perfil'
            />
            <h2 className='text-white m-2'>{artist.description}</h2>
          </div>
        </div>
        <div className='flex justify-center my-3'>
          <button className="h-10  text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-0 font-medium border-none text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md shadow-md'">
            Ver Perfil
          </button>
        </div>
      </div>
    </>
  )
}
export default ArtistResult
