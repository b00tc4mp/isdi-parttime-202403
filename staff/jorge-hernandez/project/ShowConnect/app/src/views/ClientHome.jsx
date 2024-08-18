import logic from '../logic'
import Header from '../components/Header'
import UserChatsAndMessagesList from '../components/UserChatsAndMessagesList'

function ClientHome({ onUserLoggedOut }) {
  const handleLogout = () => {
    logic.logoutUser()
    onUserLoggedOut()
  }
  return (
    <>
      <Header
        isArtistHomeVisible={true}
        loginButtonChildren='logout'
        onClick={handleLogout}
      >
        ShowConnect
      </Header>
      <UserChatsAndMessagesList />
    </>
  )
}
export default ClientHome
