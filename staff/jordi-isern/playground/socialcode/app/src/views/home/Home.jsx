import Button from "../../Components/Core/Button";
import Title from "../../Components/Core/Title";
import View from "../../Components/Library/View";
import Header from "./components/Header";

function Home({onUserLoggedOut}) {
    console.log('home -> render')

    const handleLogout =() => {
        logic.logoutUsern()

        onUserLoggedOut()
    }

    return <View>
        <Header>
            <Button onClick={handleLogout}>logout</Button>
        </Header>

        <View tag='main'>

        </View>

        <footer></footer>
    </View>
}

export default Home