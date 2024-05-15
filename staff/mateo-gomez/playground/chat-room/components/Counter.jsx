const { Component } = React

class Counter extends Component {
    constructor() {
        super()

        console.log('Counter -> constructor')

        this.state = { count: 0 }
    }

    setState(newState) { //method overriding
        console.log('Counter -> setState')

        super.setState(newState)
    }

    // 1...6
    //handleCountClick() {
    //7:ok 
    handleCountClick = () => {
        console.log('Counter -> handleCountClick')

        this.setState({ count: this.state.count + 1 })
    }

    componentDidMount() { //method overriding
        console.log('Counter -> componentDidMount')
    }

    componentDidUpdate() { //method overriding
        console.log('Counter -> componentDidUpdate')
    }

    componentWillUnmount() { //method overriding
        console.log('Counter -> componentWillUnmount')
    }

    componentWillReceiveProps(newProps, oldProps) { //method overriding
        console.log('Counter -> componentWillReceiveProps')
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
        </section>
    }

}