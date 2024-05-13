
const rootElement = document.getElementById('root')

const root = ReactDOM.createRoot(rootElement)

const _jsx = React.createElement

const title = <h1>Hello pals</h1>


const redItem = <li>red</li>

const yellowItem = <li>yellow</li>

const blueItem = <li>blue</li>

const colorList = <ul>[redItem, yellowItem, blueItem]</ul>

const helloButton = <button onClick={() => alert('How are you?')}>Aloha</button>


/*const helloButton = <button onClick={() => {

    alert('How are you?')
}}>Aloha</button> */


root.render([title, colorList, helloButton])