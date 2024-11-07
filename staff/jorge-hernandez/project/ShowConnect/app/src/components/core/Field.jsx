function Field({
  labelClass,
  labelChildren,
  htmlFor,
  id,
  type,
  value,
  inputClass,
  onChange,
  placeholder,
  divClass,
}) {
  return (
    <div className={divClass}>
      <label className={labelClass} htmlFor={htmlFor}>
        {labelChildren}
      </label>

      <input
        type={type}
        value={value}
        className={inputClass}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}
export default Field
