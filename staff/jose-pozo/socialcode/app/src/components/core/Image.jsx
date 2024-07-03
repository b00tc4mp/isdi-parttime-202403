function Image({ className, src, altText }) {
    return <img className={`Image ${className ? className : ''}`} src={src} alt={altText} />
}

export default Image