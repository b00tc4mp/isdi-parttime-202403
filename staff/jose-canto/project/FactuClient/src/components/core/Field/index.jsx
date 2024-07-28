import "./index.css"

export default function Field({ children, id, type, placeholder }) {
  return (
    <>
      <div className="Field">
        <label htmlFor={id}>{children}</label>
        <input type={type} placeholder={placeholder} id={id} required></input>
      </div>
    </>
  )
}
