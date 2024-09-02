import Button from './core/Button'

function ArtistResult({ onClickProfile, artisticName, description, image }) {
  return (
    <>
      <div className='border border-e-white rounded-xl my-3 mx-2 shadow-2xl bg-blue-500'>
        <div className='flex my-3 justify-center'>
          <div className='flex flex-col items-center mx-4 '>
            <h1 className='text-white text-[40px] my-5'>{artisticName}</h1>
            <img
              className='w-40 h-40 object-cover shadow-black shadow-md border border-spacing-2 border-white'
              src={image}
              alt='imágen de perfil'
            />
            <h2 className='text-white m-2'>{description}</h2>
          </div>
        </div>
        <div className='flex justify-center my-3'>
          <Button onClick={onClickProfile}>Ver Perfil</Button>
        </div>
      </div>
    </>
  )
}
export default ArtistResult
