function Header(value) {
  Component.call(this, "h" + value)
  this.addClass("Header")

}

Header.prototype = Object.create(Component.prototype)
Header.prototype.constructor = Header

