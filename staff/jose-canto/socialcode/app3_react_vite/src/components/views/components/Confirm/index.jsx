import Button from "../../../core/Button"
import Text from "../../../core/Text"

import "./index.css"

function Confirm({ action, onConfirmDeletePost, onCancelDeletePost, onConfirmEditPost, onCancelEditPost }) {
  return (
    <>
      <div className="Confirm">
        <Text>{action} the post?</Text>
        <Button className="Button" onClick={onCancelDeletePost || onCancelEditPost}>
          Cancel
        </Button>
        <Button className="Button" onClick={onConfirmDeletePost || onConfirmEditPost}>
          Confirm
        </Button>
      </div>
    </>
  )
}

export default Confirm
