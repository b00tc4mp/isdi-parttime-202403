import { useState, useEffect, useContext } from 'react'
import logic from '../logic/index'
import extractPayloadFromJWT from '../utils/extractPayloadFromJWT'
import Button from './core/Button'
import ChatList from './ChatList'
import MessagesList from './MessagesList'
import Context from '../Context'

function UserChatsAndMessagesList() {
  const [chats, setChats] = useState([])

  const [selectedChat, setSelectedChat] = useState(null)

  const [intervalId, setIntervalId] = useState(null)

  const { alert } = useContext(Context)

  const { sub: userId } = extractPayloadFromJWT(sessionStorage.token)

  const loadChats = () => {
    try {
      logic
        .getUserChatsAndMessages(userId)
        .then((chats) => {
          setChats(chats)

          if (selectedChat) {
            const updatedChat = chats.find(
              (chat) => chat.id === selectedChat.id
            )
            setSelectedChat(updatedChat || null)
          }
        })
        .catch((error) => {
          console.error(error.message)
          alert(error.message)
        })
    } catch (error) {
      console.error(error.message)
      alert(error.message)
    }
  }

  useEffect(() => {
    loadChats()
  }, [])

  useEffect(() => {
    if (selectedChat) {
      const id = setInterval(loadChats, 5000)
      setIntervalId(id)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [selectedChat])

  const handleChatClick = (chat) => {
    setSelectedChat(chat)
  }

  const handleCloseChat = () => {
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(null)
    }
    setSelectedChat(null)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const messageText = form.mensaje.value

    logic
      .createAndUpdateMessage(selectedChat.id, userId, messageText)
      .then(() => {
        form.reset()
        loadChats()
      })
      .catch((error) => {
        console.error(error.message)
        alert(error.message)
      })
  }

  return (
    <div className='flex flex-col items-center h-screen border rounded-md mx-5 my-5 bg-blue-500 shadow-2xl shadow-slate-300'>
      <h1
        className={`m-4 text-2xl ${
          chats.length === 0 ? 'text-red-500' : 'text-white'
        }`}
      >
        {chats.length === 0 ? 'No se han encontrado chats' : 'Tus Chats'}
      </h1>

      {selectedChat ? (
        <div className='border rounded-md px-8 pb-8 flex flex-col shadow-xl shadow-gray-800 bg-blue-600'>
          <div className='flex justify-end m-0 py-4 cursor-pointer'>
            <Button className='text-white text-3xl' onClick={handleCloseChat}>
              &times;
            </Button>
          </div>
          <MessagesList selectedChat={selectedChat} userId={userId} />

          <form onSubmit={handleOnSubmit} className='flex space-x-2 mt-6'>
            <input
              name='mensaje'
              id='mensaje'
              className='text-black h-8 rounded p-2'
              type='text'
            />
            <Button className='h-8 text-white bg-blue-900 hover:bg-blue-950 focus:outline-none focus:ring-0 font-medium border-none text-sm px-3 py-1 dark:bg-blue-500 dark:hover:bg-blue-700 rounded-md shadow-md'>
              Enviar
            </Button>
          </form>
        </div>
      ) : (
        <ChatList onChatClick={handleChatClick} chats={chats} />
      )}
    </div>
  )
}

export default UserChatsAndMessagesList
