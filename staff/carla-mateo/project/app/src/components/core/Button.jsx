
export default function Button({ type, onClick, children }) {
    return <button className='mt-6 border border-black px-10 py-1' type={type} onClick={onClick}>{children}</button>
}

