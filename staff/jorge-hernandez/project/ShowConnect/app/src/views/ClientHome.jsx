import logic from '../logic'
import Header from '../components/Header'
import UserChatsAndMessagesList from '../components/UserChatsAndMessagesList'

function ClientHome({ onUserLoggedOut, onLogoClick }) {
  const handleLogout = () => {
    logic.logoutUser()
    onUserLoggedOut()
  }

  const handleLogoClick = (e) => {
    e.preventDefault()
    onLogoClick()
  }
  return (
    <>
      <Header
        isArtistHomeVisible={true}
        loginButtonChildren='logout'
        onClick={handleLogout}
        onLogoClick={handleLogoClick}
      >
        ShowConnect
      </Header>
      <UserChatsAndMessagesList />
    </>
  )
}
export default ClientHome
