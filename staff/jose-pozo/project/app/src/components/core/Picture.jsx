function Picture({ className, src, alt }) {
    return <img className={`Picture ${className ? className : ''}`} src={src} alt={alt} />
}

export default Picture