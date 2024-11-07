function ChatList({ onChatClick, chats }) {
  return (
    <div className='flex flex-col m-4 text-lg'>
      <ul className='list-none p-0 m-0'>
        {chats.map((chat, index) => (
          <li
            className='flex m-4'
            key={index}
            onClick={() => onChatClick(chat)}
          >
            <p className='bg-blue-600 shadow-md shadow-slate-500 border rounded-md gap-3 p-2 text-white cursor-pointer hover:bg-opacity-50 transition-colors duration-300'>
              {chat.participants
                .map(
                  (participant) => participant.artisticName || participant.name
                )
                .join(' => ')}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default ChatList
