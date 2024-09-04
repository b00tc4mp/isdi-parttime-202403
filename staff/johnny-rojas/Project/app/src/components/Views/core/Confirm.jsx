import './Confirm.css';

export default function Confirm({
  setShowConfirmCancel,
  handleBlockRoom,
  handleCloseAccount,
}) {

  const handleShowConfirm = () => {
    if (handleBlockRoom) handleBlockRoom()
    if (handleCloseAccount) handleCloseAccount()
  }

  return (
    <div className="Confirm">
      <h2>¿Seguro que quieres continuar?</h2>
      <div className="Confirm-Buttons">
        <button className="ConfirmButton" onClick={handleShowConfirm}>
          Aceptar
        </button>
        <button className="CancelButton" onClick={() => setShowConfirmCancel(!setShowConfirmCancel)}>
          Cancelar
        </button>
      </div>
    </div>
  );
}