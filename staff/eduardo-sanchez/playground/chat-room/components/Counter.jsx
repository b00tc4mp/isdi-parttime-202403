const { Component } = React

class Counter extends Component {
    constructor() {
        super()

        console.log('Counter -> constructor')

        this.state = { count: 0 }

        // this.handleCountClick = this.handleCountClick.bind(this) // 3:ok
    }

    setState(newState) { // method overriding
        console.log('Counter -> setState')

        super.setState(newState)
    }

    // 1...6
    // handleCountClick() {
    //this.setState({ count: this.state.count + 1 })
    //}
    // 7:ok Es igual xo con flecha

    handleCountClick = () => {
        console.log('Counter -> handleCountClick')

        this.setState({ count: this.state.count + 1 })
    }

    componentDidMount() { // method overriding
        console.log('Counter -> componentDidMount')
    }

    componentDidUpdate() { // method overriding
        console.log('Counter -> componentDidUpdate')
    }

    componentWillUnmount() { // method overriding
        console.log('Counter -> componentWillUnmount')
    }

    componentWillReceiveProps(newProps, oldProps) { // method overriding
        console.log('Counter -> componentWillUnmount')
    }

    render() {
        console.log('Counter -> render')

        return <section>
            <p>{this.state.count}</p>

            {/* 1:ko, 3:ok, 7:ok */}
            <button onClick={this.handleCountClick}>Count</button>

            {/* 2:ok */}
            {/* <button onClick={this.handleCountClick.bind(this)}>Count</button> */}

            { /* 4:ko */}
            {/* <button onClick={function () { this.handleCountClick() }}>Count</button>  */}

            { /* 5:ok */}
            {/* <button onClick={function () { this.handleCountClick() }.bind(this)}>Count</button> */}

            { /* 6:ok */}
            {/* <button onClick={() => this.handleCountClick()}>Count</button> */}

            {/* el caso q no esta comentado en el return de render seria el n7 */}
        </section>
    }
}

// En la devtools veremos esto cuando pulsemos el boton de Count

// Counter -> handleCountClick
// Counter -> setState
// Counter -> render
// Counter -> componentDidUpdate