const { Component } = React

class Field extends Component {
  constructor() {
    super()
  }

  render() {
    const { type } = this.props
    const { id } = this.props
    const { htmlFor } = this.props
    const { username } = this.props
    const { text } = this.props

    return (
      <div className='Field'>
        <Label htmlFor={htmlFor} name={username} text={text} />

        <Input type={type} id={id} />
      </div>
    )
  }
}
