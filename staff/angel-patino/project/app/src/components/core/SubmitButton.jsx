import Button from "./Button"

function SubmitButton({ className, children }) {
  return (
    <Button className={className} type="submit">
      {children}
    </Button>
  )
}

export default SubmitButton
