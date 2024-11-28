const {Component} = React

class Counter extends Component{
    constructor(){
        super()
        this.state = {count: 0}
    }

    handleCountClick(){
        this.setState({count: this.state.count +1})
    }
    render(){
        return <section>
            <p>{this.state.count}</p>
            <button onClick={this.handleCountClick.bind(this)}>Count</button>
        </section>
    }
}