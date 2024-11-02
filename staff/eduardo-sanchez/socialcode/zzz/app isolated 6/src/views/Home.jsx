import Title from '../components/core/Title'
import View from '../components/library/View'

function Home() {
    console.log('Home -> render')

    return <View>
        <header></header>

        <View tag="main">
            <Title>Hello, Home!</Title>
        </View>

        <footer></footer>
    </View>
}

export default Home