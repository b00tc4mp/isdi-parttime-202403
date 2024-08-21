export default function View({ className, children }) {
    return <div className={`flex-grow ${className}`}>{children}</div>
}
