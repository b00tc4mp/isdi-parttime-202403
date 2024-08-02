import "./index.css"

export default function Main({ className, children }) {
  return (
    <>
      <main className={`Main ${className}`}>{children}</main>
    </>
  )
}
