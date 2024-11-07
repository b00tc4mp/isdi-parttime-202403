function MessagesList({ selectedChat, userId }) {
  return (
    <>
      <h2 className='text-white text-2xl mb-8'>Mensajes del Chat</h2>

      <ul className='flex flex-col gap-3'>
        {selectedChat.messages.map((message, index) => (
          <li
            key={index}
            className={`text-white flex flex-col gap-2 ${
              message.sender.id === userId
                ? 'text-right border rounded-md p-2 bg-blue-400 bg-opacity-50'
                : 'text-left border rounded-md p-2 bg-pink-300 bg-opacity-40'
            }`}
          >
            <p className='font-sans'>"{message.text}"</p>
          </li>
        ))}
      </ul>
    </>
  )
}
export default MessagesList
