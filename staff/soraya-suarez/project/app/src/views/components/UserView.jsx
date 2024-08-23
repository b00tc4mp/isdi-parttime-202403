import Text from '../../components/core/Text'

function UserView({ user }) {
    return <div className="bg-white w-full text-center">
        <Text>Name: {user.name}</Text>
        <Text>Surname: {user.surname}</Text>
        <Text>Phone: {user.phone}</Text>
        <Text>Email: {user.email}</Text>
        <img className="Image" src={user.avatar}/>
    </div>
}

export default UserView