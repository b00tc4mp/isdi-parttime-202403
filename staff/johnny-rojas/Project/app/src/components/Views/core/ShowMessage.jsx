const ShowMessage = ({ title, message, onClose }) => {
  <div className="ShowMessageContainer">
    <div className="ShowMessageContent">
      <h2>{title}</h2>
      <p>{message}</p>
      <button onClick={onClose}>Aceptar</button>
    </div>
  </div>
}
 export default ShowMessage