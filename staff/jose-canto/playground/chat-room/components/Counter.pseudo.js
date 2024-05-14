//const React = {}

class Component {
  construtor() {
  }

  setState(newState) {
    this.state = newState

    // ...
    this.render()
  }
}

//React.Component = Component

class Counter extends Component {
  constructor() {
    super()

    this.state = { count: 0 }
  }

  handleCountClick() {
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    console.log(`<section>
            <p>${this.state.count}</p>
        
            <button onClick={this.handleCountClick.bind(this)}>Count</button>
        </section>`)
  }
}

const counter = new Counter() //<Counter>

counter.render()
// VM316:29 <section>
//             <p>0</p>

//             <button onClick={this.handleCountClick.bind(this)}>Count</button>
//         </section>
// undefined

debugger
counter.handleCountClick()
// VM316:29 <section>
//             <p>1</p>

//             <button onClick={this.handleCountClick.bind(this)}>Count</button>
//         </section>
// undefined

counter.handleCountClick()
// VM316:29 <section>
//             <p>2</p>

//             <button onClick={this.handleCountClick.bind(this)}>Count</button>
//         </section>
// undefined

counter.handleCountClick()
// VM316:29 <section>
//             <p>3</p>

//             <button onClick={this.handleCountClick.bind(this)}>Count</button>
//         </section>
// undefined

counter.handleCountClick()
// VM316:29 <section>
//             <p>4</p>

//             <button onClick={this.handleCountClick.bind(this)}>Count</button>
//         </section>
// undefined

counter.handleCountClick()
// VM316:29 <section>
//             <p>5</p>

//             <button onClick={this.handleCountClick.bind(this)}>Count</button>
//         </section>
// undefined