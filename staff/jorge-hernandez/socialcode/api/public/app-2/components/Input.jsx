const { Component } = React

class Input extends Component {
  constructor() {
    super()
  }

  render() {
    const { type } = this.props
    const { id } = this.props

    return <input type={type} id={id} />
  }
}
