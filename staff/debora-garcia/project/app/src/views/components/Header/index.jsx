import "./index.css"

export default function Header({ children }) {
    console.log("Header -> render")

    return <header className="Header">{children}</header>
}