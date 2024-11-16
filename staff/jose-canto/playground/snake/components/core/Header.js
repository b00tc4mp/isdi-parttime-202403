function Header(value) {
  Component.call(this, "h" + value)

  this.addClass("Header")
  this.container.header = "h" + value
}


Header.prototype = Object.create(Component.prototype)
Header.prototype.constructor = Header

