import UserChatsAndMessagesList from '../components/UserChatsAndMessagesList'

function ArtistMessages({ onClickBack }) {
  return (
    <div className='flex flex-col'>
      <i
        onClick={onClickBack}
        className='text-white fa-solid fa-house cursor-pointer m-2 text-4xl text-end mx-5 mb-0 mt-11'
      ></i>

      <UserChatsAndMessagesList />
    </div>
  )
}

export default ArtistMessages
