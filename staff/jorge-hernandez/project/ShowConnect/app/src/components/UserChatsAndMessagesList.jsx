import { useState, useEffect } from 'react'
import getUserChatsAndMessages from '../logic/getUserChatsAndMessages'

function UserChatsAndMessagesList() {
  const [chats, setChats] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)

  useEffect(() => {
    loadChats()
  }, [])

  const loadChats = () => {
    try {
      getUserChatsAndMessages()
        .then((chats) => {
          setChats(chats)
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

  const handleChatClick = (chat) => {
    setSelectedChat(chat)
  }

  const handleCloseChat = () => {
    setSelectedChat(false)
  }

  return (
    <div className='flex flex-col items-center h-screen'>
      <h1
        className={`m-4 text-2xl ${
          chats.length === 0 ? 'text-red-500' : 'text-white'
        }`}
      >
        {chats.length === 0 ? 'No se han encontrado chats' : 'Tus Chats'}
      </h1>

      <div className='flex flex-col gap-4 m-4 text-lg '>
        {chats.map((chat, index) => (
          <div key={index} onClick={() => handleChatClick(chat)}>
            <p className='text-white'>
              {chat.participants
                .map(
                  (participant) => participant.artisticName || participant.name
                )
                .join(' => ')}
            </p>
          </div>
        ))}
      </div>

      {selectedChat && (
        <>
          <div className='border rounded-md px-8 pb-8 flex flex-col shadow-xl'>
            <div className='flex justify-end m-0 py-4 cursor-pointer'>
              <button className='text-sm text-white' onClick={handleCloseChat}>
                Cerrar
              </button>
            </div>
            <h2 className='text-white text-2xl mb-8'>Mensajes del Chat</h2>
            <ul>
              {selectedChat.messages.map((message, index) => (
                <li key={index} className='text-white flex flex-col gap-2'>
                  <h2 className='text-xl'>{message.sender[0].name}:</h2>{' '}
                  {message.text}
                  <form>
                    <input
                      className='text-black h-8 rounded p-2 m-3'
                      type='text'
                    />
                    <button className='h-10 mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-0 font-medium border-none text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md shadow-md'>
                      Enviar
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}

export default UserChatsAndMessagesList
