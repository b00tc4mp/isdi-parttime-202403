const { Component } = React

class Counter extends Component {
    constructor() {
        super()

        console.log('Counter -> constructor')

        this.state = { count: 0 }

        //this.handleCountClick = this.handleCountClick.bind(this) // 3:funciona
    }

    setState(newState) {
        console.log('Counter -> setState')

        super.setState(newState)
    }
    // del 1 al 6
    // handleCountClick() {
    // el 7 (favorito por mi)
    handleCountClick = () => {
        console.log('Counter -> handleCountClick')
        this.setState({ count: this.state.count + 1 })
    }

    componentDidMount() {
        console.log('COunter -> componentDidMount')
    }

    componentDidUpdate() {
        console.log('Counter -> componentDidUpdate')
    }

    componentWillUnmount() {
        console.log('Counter -> componentWillUnmount')
    }

    UNSAFE_componentWillReceiveProps(newProps, oldProps) {
        console.log('Counter -> componentWillUnmount')
    }

    render() {
        console.log('Counter -> render')

        return <section>
            <p>{this.state.count}</p>
            {/* 1 no funciona. 3 funciona, 7 funciona */}
            <button onClick={this.handleCountClick}>Count</button>
            {/* 2 funciona */}
            {/* <button onClick={this.handleCountClick.bind(this)}>Count</button> */}
            {/* 4 no funciona */}
            {/* <button onClick={function() {this.handleCountClick}[]>Count</button> */}
            {/* 5 funciona */}
            {/* <button onClick={function () { this.handleCountClick() }.bind(this)}>Count</button> */}
            {/* 6 funciona */}
            {/* <button onClick={() => this.handleCountClick()}>Count</button> */}
        </section>
    }
}