import { useState, Context } from '../utils/hooks'
import { Alert, Confirm }  from '../components/core'

const ContextProvider = ({ children }) => {
  const [message, setMessage] = useState(null)
  const [confirmOptions, setConfirmOptions] = useState(null)

  const alert = (message) => {
    setMessage(message)
  }
  const confirm = ({ message, onAccept, onCancel }) => {
    setConfirmOptions({ message, onAccept, onCancel })
  }
  const handleAlertAccepted = () => {
    setMessage(null)
  }

  const handleConfirmAccept = () => {
    if (confirmOptions?.onAccept) {
      confirmOptions.onAccept()
    }
    setConfirmOptions(null)
  }
  
  const handleConfirmCancel = () => {
    if (confirmOptions?.onCancel) {
      confirmOptions.onCancel()
    }
    setConfirmOptions(null)
  }

  return (
    <Context.Provider value={{ alert, confirm }}>
      {children}
      {message && <Alert message={message} onAccept={handleAlertAccepted} />}
      {confirmOptions && (
        <Confirm 
          message={confirmOptions.message}
          onAccept={handleConfirmAccept}
          onCancel={handleConfirmCancel}
        />
      )}
    </Context.Provider>
  )
}

export default ContextProvider