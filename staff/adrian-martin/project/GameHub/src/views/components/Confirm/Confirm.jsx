import './Confirm.css';
import Button from "../../../components/core/Button/Button";

function Confirm({
    setShowConfirmDelete,
    handleDeleteGame,
    handleConfirmLogOut,
    message
}) {
    const handleDelete = () => {
        if (handleDeleteGame) {
            handleDeleteGame()
        }
        if (handleConfirmLogOut) {
            handleConfirmLogOut()
        }
    };

    return (
        <div className='Confirm-container'>
            <div className='Confirm-p-2button'>
                <p className='Confirm-p'>{message || "¿Estás seguro que quieres proceder?"}</p>
                <div className='Confirm-container-button'>
                    <Button className='Confirm-button-cancel' onClick={() => setShowConfirmDelete(false)}>
                        Cancel
                    </Button>
                    <Button className='Confirm-button-acept' onClick={handleDelete}>
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Confirm