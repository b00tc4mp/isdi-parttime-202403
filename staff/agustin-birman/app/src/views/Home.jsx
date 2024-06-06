import View from '../components/library/View'
import Header from '../components/library/Header'
import Footer from '../components/library/Footer'
import Button from '../components/core/Button'
import userLogic from '../userLogic'

function Home({ onUserLoggedOut }) {
    const handleLogout = () => {
        userLogic.logoutUser()

        onUserLoggedOut()
    }

    return <View>
        <Header>
            <Button onClick={handleLogout}>Logout</Button>
        </Header>

        <View tag='main'>

        </View>

        <Footer>
            <Button>+</Button>
        </Footer>
    </View>
}

export default Home