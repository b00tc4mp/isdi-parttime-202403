const { Component } = React

class Label extends Component {
  constructor() {
    super()
  }

  render() {
    const { htmlFor } = this.props
    const { name } = this.props
    const { text } = this.props

    return (
      <label htmlFor={htmlFor} name={name}>
        {text}
      </label>
    )
  }
}
