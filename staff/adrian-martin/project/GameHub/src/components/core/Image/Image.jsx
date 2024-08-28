function Image({ className, src, onClick, alt, style, size, borderRadius }) {
    return (
        <img
            onClick={onClick}
            className={className}
            src={src}
            alt={alt}
            style={{
                width: size,
                height: size,
                borderRadius: borderRadius,
            }}
        />
    );
}

export default Image;