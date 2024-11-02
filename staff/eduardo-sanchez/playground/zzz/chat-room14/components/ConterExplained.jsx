// Importamos el Componente de React para poder extenderlo y crear nuestro propio componente
const { Component } = React;

// Definimos nuestro componente Counter que hereda de la clase Component de React
class Counter extends Component {
	// El constructor es el primer método que se ejecuta al crear una instancia del componente
	constructor() {
		// Llamamos al método constructor de la clase padre (Component) usando super()
		super();

		// Inicializamos el estado del componente con un objeto que tiene una propiedad llamada   count, inicializada en 0
		this.state = { count: 0 };
	}

	// Método para manejar el clic en el botón
	handleCountClick() {
		// Actualizamos el estado del componente usando setState
		// setState acepta un objeto que representa el nuevo estado del componente
		// En este caso, estamos incrementando el valor de count en 1 cada vez que se hace clic en el botón
		this.setState({ count: this.state.count + 1 });
	}

	// El método render() es obligatorio en cada componente de React
	// Define la estructura del componente y devuelve lo que se mostrará en el navegador
	render() {
		return (
			<section>
				{/* Mostramos el valor actual de count en un párrafo */}
				<p>{this.state.count}</p>

				{/* Agregamos un botón que llama al método handleCountClick cuando se hace clic en él */}
				<button onClick={this.handleCountClick.bind(this)}>Count</button>
			</section>
		);
	}
}


/* 
Aquí hay algunos puntos clave a tener en cuenta:

1. **Constructor**: Se utiliza para inicializar el estado del componente. En este caso, inicializa el estado con `{ count: 0 }`.
2. **Estado (state)**: `this.state` es un objeto que representa el estado del componente. Es mutable y se puede actualizar usando `this.setState()`.
3. **Manejo de eventos**: El método `handleCountClick()` se ejecuta cuando se hace clic en el botón. Este método actualiza el estado del componente.
4. **Renderizado**: El método `render()` define la estructura del componente. Devuelve JSX que representa lo que se mostrará en el navegador.
5. **Actualización del estado**: Es importante usar `setState()` para actualizar el estado en lugar de modificar directamente `this.state`. Esto asegura que React pueda realizar las actualizaciones necesarias y vuelva a renderizar el componente si es necesario.

*/