import './Alert.css'

function Alert({ message, onAccept }) {
  return (
    <div className='ContainerAlert'>
      <div className="Alert">
        <p>{message}</p>
        <button onClick={onAccept}>Aceptar</button>
      </div>
    </div>

  )
}

export default Alert