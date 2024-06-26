import "./View.css"

function View({
  tag: Tag = "div",
  className,
  children,
  direction = "column",
  align = "center",
}) {
  return (
    <Tag
      className={`View ${className ? className : ""} ${
        direction === "column" ? "View column" : "View row"
      } ${align === "center" ? "View center" : ""}`}
    >
      {children}
    </Tag>
  )
}

export default View
