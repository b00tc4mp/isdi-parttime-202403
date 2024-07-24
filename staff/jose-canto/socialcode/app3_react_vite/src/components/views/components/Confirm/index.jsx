import Button from "../../../core/Button"
import Text from "../../../core/Text"

import "./index.css"

function Confirm({ action, onConfirmDeletePost, onCancelDeletePost }) {
  return (
    <>
      <div className="Confirm">
        <Text>{action} the post?</Text>
        <Button className="Button" onClick={onCancelDeletePost}>
          Cancel
        </Button>
        <Button className="Button" onClick={onConfirmDeletePost}>
          Confirm
        </Button>
      </div>
    </>
  )
}

export default Confirm
