import Header from '../components/Header'
import UserChatsAndMessagesList from '../components/UserChatsAndMessagesList'

function ArtistMessages({ onClickBack }) {
  return (
    <>
      <i
        onClick={onClickBack}
        className='text-white fa-solid fa-house cursor-pointer m-2'
      ></i>

      <UserChatsAndMessagesList />
    </>
  )
}

export default ArtistMessages
