
export default function Button({ type, onClick, children }) {
    return <button className='mt-4 mb-4 border border-black px-10 py-1' type={type} onClick={onClick}>{children}</button>
}

