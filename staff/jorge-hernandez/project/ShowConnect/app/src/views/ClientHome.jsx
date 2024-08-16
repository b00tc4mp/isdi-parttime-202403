import logic from '../logic'
import Header from '../components/Header'

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
      <h2>Client Home</h2>
    </>
  )
}
export default ClientHome
