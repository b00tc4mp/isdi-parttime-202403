export default function Label({ htmlFor, children }) {
    return <label className='mb-[.5rem]' htmlFor={htmlFor}>{children}</label>
}

