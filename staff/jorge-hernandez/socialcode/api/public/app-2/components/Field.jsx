function Field({ htmlFor, name, children, type, id }) {
  return (
    <div className='Field'>
      <Label htmlFor={htmlFor}>{children}</Label>
      <Input type={type} id={id} name={name} />
    </div>
  )
}
