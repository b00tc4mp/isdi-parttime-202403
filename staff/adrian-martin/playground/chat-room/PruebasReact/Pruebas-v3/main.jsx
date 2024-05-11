const rootElement = document.getElementById('root')

const root = ReactDOM.createRoot(rootElement)

const _jsx = React.createElement

const title = <h1>Hola Mundo</h1>

const redItem = <li>red</li>
const blueItem = <li>blue</li>
const yellowItem = <li>yellow</li>

const colorList = <ul>{[redItem, blueItem, yellowItem]}</ul>

const helloButton = <button onClick={() =>  alert('React funciona')}>Hello</button>
        
root.render([title, colorList, helloButton]) 