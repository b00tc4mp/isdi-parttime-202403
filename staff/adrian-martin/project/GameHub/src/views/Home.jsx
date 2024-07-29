import View from '../components/library/View/View'
import Header from "./components/Header/Header"
import Footer from './components/Footer/Footer'
import Burguer from './components/Burguer/Burguer'

function Home({ }) {
    return <View>
        <Burguer />

        <h1>Hola Mundo</h1>

        <Footer />
    </View>
}

export default Home