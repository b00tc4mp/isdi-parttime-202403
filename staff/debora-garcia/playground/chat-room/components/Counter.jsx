// compo react inteligente

const { Component } = React

class Counter extends Component {
    constructor() {
        super()

        //propiedad del constructor  que te permite saber el estado del componente
        this.state = { count: 0 }
    }

    handelCountClick() {
        this.setState({ count: this.state.count + 1 })
        //se tiene que pasar las nuevas propiedades del objeto  para actualizar el estado de un objeto
        // en react al detectar un estado actualizado se da la orden de pintar de nuevo de forma asincrona 
    }

    render() {
        return <section>
            <p>{this.state.count}</p>
            {/* le estamos pasando el objecto en memoria de la funcion handelCountClick() que referenciada por esta propiedad */}
            <button onClick={this.handelCountClick.bind(this)}>Count</button>
            {/* bind envuelve la funcion dentro de otra usando el contexto de la funcion a la queremos referenciar */}
        </section>

        //react guarda memoria de un componente que mantiene el estado (compo inteligente)
    }

}