import Button from '../../core/Button'

function MenuItem({ onClick, children }) {
    return <Button className='MenuItem' onClick={onClick}>{children}</Button>
}

export default MenuItem