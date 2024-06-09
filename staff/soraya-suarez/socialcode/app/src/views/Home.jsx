import View from '../components/library/View'

import Header from './components/Header'

import Button from '../components/core/Button'
import logic from '../logic'

function Home({ onUserLoggedOut }) {
    console.log('Home -> render')

    const handleLogout = () => {
        logic.logoutUser()

        onUserLoggedOut()
    }

    return <View>
        <Header>
            <Button onClick={handleLogout}>Logout</Button>
        </Header>

        <View tag="main">

        </View>

        <footer></footer>
    </View>
}

export default Home