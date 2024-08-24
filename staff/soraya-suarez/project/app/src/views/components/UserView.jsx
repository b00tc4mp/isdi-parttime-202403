import Text from '../../components/core/Text'

function UserView({ user }) {
    return <div className="bg-white w-full text-center">
        <Text>Name: {user.name}</Text>
        <Text>Surname: {user.surname}</Text>
        { user.phone !== '' && <Text>Phone: {user.phone}</Text>}
        <Text>Email: {user.email}</Text>
        {user.avatar !== '' && <img className="inline w-12" src={user.avatar}/>}
    </div>
}

export default UserView