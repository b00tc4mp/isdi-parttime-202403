function UserView({ user }) {
    return <div className='bg-white w-full text-center '>
        {user.avatar !== '' && <img className="inline w-12" src={user.avatar}/>}
        <div className='flex  justify-center'><p className='pr-2 font-extrabold'>Name:</p> <p className='italic'>{user.name}</p></div>
        <div className='flex  justify-center'><p className='pr-2 font-extrabold'>Surname:</p> <p className='italic'>{user.surname}</p></div>
        <div className='flex  justify-center'>{user.phone !== '' && <><p className='pr-2 font-extrabold'>Phone:</p><p className='italic'>{user.phone}</p></>}</div>
        <div className='flex  justify-center'><p className='pr-2 font-extrabold'>Email:</p> <p className='italic'>{user.email}</p></div>
    </div>
}

export default UserView