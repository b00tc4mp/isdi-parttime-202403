import './Image.css'

function Image({ src, className }) {
    return <img className={`Image ${className ? className : ''}`} src={src} />
}

export default Image