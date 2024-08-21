import Title from "./Title";

function ShowConfirm({setShowConfirm, handleDeleteRoom}) {
  const handleConfirm = () => {
    if (handleDeleteRoom) {
      handleDeleteRoom()
    }
  }
  return (
    <div className="ConfirmContainer">
      <Title> </Title>
      <div className="Buttons">
        <div className="Confirm">
          <button onClick={handleConfirm}>Aceptar</button>
        </div>
        <div className="Denied">
          <button onClick={setShowConfirm}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
export default ShowConfirm