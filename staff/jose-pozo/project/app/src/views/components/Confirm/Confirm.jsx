import './Confirm.css'

export default ({ message, onCancel, handleDeleteAppointment, handleDeleteService, handleDeleteCustomer }) => {
    const handleDelete = () => {
        if (handleDeleteAppointment) {
            handleDeleteAppointment()
        }

        if (handleDeleteService) {
            handleDeleteService()
        }

        if (handleDeleteCustomer) {
            handleDeleteCustomer()
        }
    }

    return <>

        <div className="Confirm">
            <div className="ConfirmBox">
                <p>{message}</p>
                <div className='ConfirmButtonsBox'>
                    <button className="ConfirmButtonCancel" onClick={onCancel}>Cancel</button>
                    <button className="ConfirmButtonConfirm" onClick={handleDelete}>Confirm</button>
                </div>
            </div>
        </div>
    </>
}
