// const { Component } = React

function Label({ htmlFor, name, children }) {
  return (
    <label htmlFor={htmlFor} name={name}>
      {children}
    </label>
  )
}
