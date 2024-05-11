const { Component } = React;

class ContainColor extends Component {
	constructor() {
		super();

		this.state = {
			colorOne: "red",
			colorTwo: "blue",
		};
	}

	handleClickContainerOne = () => {
		function getRandomColor() {
			const r = Math.floor(Math.random() * 256);
			const g = Math.floor(Math.random() * 256);
			const b = Math.floor(Math.random() * 256);

			const hexR = r.toString(16).padStart(2, "0");
			const hexG = g.toString(16).padStart(2, "0");
			const hexB = b.toString(16).padStart(2, "0");

			return `#${hexR}${hexG}${hexB}`;
		}

		const randomColor = getRandomColor();
		const randomColor2 = getRandomColor();

		this.setState({ colorOne: randomColor });
		this.setState({ colorTwo: randomColor2 });
	};

	handleClickContainerTwo = () => {
		function getRandomColor() {
			const r = Math.floor(Math.random() * 256);
			const g = Math.floor(Math.random() * 256);
			const b = Math.floor(Math.random() * 256);

			const hexR = r.toString(16).padStart(2, "0");
			const hexG = g.toString(16).padStart(2, "0");
			const hexB = b.toString(16).padStart(2, "0");

			return `#${hexR}${hexG}${hexB}`;
		}

		const randomColor2 = getRandomColor();

		this.setState({ colorTwo: randomColor2 });
	};

	render() {
		return (
			<div className='ContainColor'>
				<div
					className='ContainerOne'
					style={{ backgroundColor: this.state.colorOne }}
					onClick={this.handleClickContainerOne}
				>
					Click me to swap Color!
				</div>
				<div
					style={{ backgroundColor: this.state.colorTwo }}
					onClick={this.handleClickContainerTwo}
					className='ContainerTwo'
				>
					Click me to swap Color!
				</div>
			</div>
		);
	}
}
