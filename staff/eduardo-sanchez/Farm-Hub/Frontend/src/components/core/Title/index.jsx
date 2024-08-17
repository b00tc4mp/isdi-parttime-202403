import './index.css'

export default function Title({ children, className }) {
    return <h1 className={` ${className ? className : 'Title'}`} >{children}</h1>
}
