import './index.css'

export default function Title({ children, className = 'Title' }) {
    return <h1 className={` ${className ? className : ''}`} >{children}</h1>
}
