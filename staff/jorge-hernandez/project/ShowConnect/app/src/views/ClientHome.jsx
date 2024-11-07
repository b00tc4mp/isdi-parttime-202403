import logic from '../logic'
import Header from '../components/Header'
import UserChatsAndMessagesList from '../components/UserChatsAndMessagesList'
import Button from '../components/core/Button'

function ClientHome({ onUserLoggedOut, onLogoClick }) {
  const handleLogout = () => {
    logic.logoutUser()
    onUserLoggedOut()
  }

  const handleLogoClick = (e) => {
    e.preventDefault()
    onLogoClick()
  }

  const handleClicktoSearch = (e) => {
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
      <div className='m-5'>
        <Button onClick={handleClicktoSearch}>Buscar Nuevos Artistas</Button>
      </div>
      <UserChatsAndMessagesList />
    </>
  )
}
export default ClientHome
