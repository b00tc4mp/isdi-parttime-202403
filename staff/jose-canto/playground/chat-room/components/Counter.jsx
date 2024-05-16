const { Component } = React;

class Counter extends Component {
	constructor() {
		super();

		this.state = { count: 0 };

		//this.handleCountClick = this.handleCountClick.bind(); Referenciando en el constructor la función (1)
	}

	handleCountClick = () => {
		// usando funcion flecha, al usar la funcion flecha referencia esta funcion.(4)
		this.setState({ count: this.state.count + 1 });
	};

	render() {
		return (
			<section>
				<p>{this.state.count}</p>
				{/*<button onClick={this.handleCountClick}>COUNT</button> Referenciando en el constructor la función (1)*/}

				{/*<button onClick={this.handleCountClick.bind(this)}>COUNT</button> Usando el bind(this) (2)*/}

				{/*<button onClick={() => this.handleCountClick()}>COUNT</button> usando la funcion flecha en el onClick(3)*/}

				<button onClick={this.handleCountClick}>CLICK</button>
				{/*usando funcion flecha, al usar la funcion flecha referencia esta funcion. (4)*/}
			</section>
		);
	}
}
