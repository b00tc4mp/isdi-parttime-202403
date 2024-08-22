function Button({ onClick, children, className }) {
  const defaultClassName =
    "h-10  text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-0 font-medium border-none text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md shadow-md'"

  return (
    <button onClick={onClick} className={className || defaultClassName}>
      {children}
    </button>
  )
}

export default Button
