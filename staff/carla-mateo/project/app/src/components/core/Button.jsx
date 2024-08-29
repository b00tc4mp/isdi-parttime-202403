export default function Button({ type, onClick, children }) {
    return <button className='m-4 border border-black px-5 py-1 rounded bg-green-200' type={type} onClick={onClick}>{children}</button>
}

