const rootElement = document.getElementById('root')

const root = ReactDOM.createRoot(rootElement)

const title = <h1>Hola Mundo</h1>

const redItem = <li>red</li>
const yellowItem = <li>yellow</li>
const blueItem = <li>blue</li>

const colorList = <ul>{[redItem, yellowItem, blueItem]}</ul>


const helloButton = <button onClick={()=>{
    alert('Hola Mundo')
}
}>Hello</button>

root.render([title, colorList, helloButton])
