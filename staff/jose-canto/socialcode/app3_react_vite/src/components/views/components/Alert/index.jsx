import "./index.css"
import Button from "../../../core/Button"
import Text from "../../../core/Text"

function Alert({ message, onAccept, level = "warn" }) {
  return (
    <>
      <div className={`AlertBox AlertBox-${level}`}>
        <Text>{message}</Text>
        <Button className="AlertButton" onClick={onAccept}>
          Accept
        </Button>
      </div>
    </>
  )
}

export default Alert
