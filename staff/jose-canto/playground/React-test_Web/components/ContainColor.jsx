const { Component } = React;

const getRandomColor = () => {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);

	return `rgb(${r},${g},${b})`;
};

class ContainColor extends Component {
	constructor() {
		super();

		this.state = {
			colorOne: "red",
			colorTwo: "blue",
		};

		// this.handleClickContainerOne = this.handleClickContainerOne.bind(this);
		// this.handleClickContainerTwo = this.handleClickContainerTwo.bind(this);
	}

	handleClickContainerOne() {
		const randomColor = getRandomColor();
		const randomColor2 = getRandomColor();

		this.setState({ colorOne: randomColor });
		this.setState({ colorTwo: randomColor2 });
	}

	handleClickContainerTwo() {
		const randomColor2 = getRandomColor();

		this.setState({ colorTwo: randomColor2 });
	}

	render() {
		return (
			<div className='ContainColor'>
				<div
					className='ContainerOne'
					style={{ backgroundColor: this.state.colorOne }}
					onClick={this.handleClickContainerOne.bind(this)}
				>
					Click me to swap Color!
				</div>
				<div
					style={{ backgroundColor: this.state.colorTwo }}
					onClick={this.handleClickContainerTwo.bind(this)}
					className='ContainerTwo'
				>
					Click me to swap Color!
				</div>
			</div>
		);
	}
}
