const { Component } = React;

class Header extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className='ContainerTitle'>
				<h1 className='Title'>{title}</h1>
			</div>
		);
	}
}
