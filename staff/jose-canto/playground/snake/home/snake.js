
function Snake() {

  this.container = document.createElement("div")
  this.container.style.position = "absolute"
}

Snake.prototype.setBackground = function (color) {
  document.body.style.backgroundColor = color
}

Snake.prototype.setWindowBorder = function (style, width) {
  document.documentElement.style.borderStyle = style;
  document.documentElement.style.borderWidth = width + "px";
  document.documentElement.style.width = "100%";
  document.documentElement.style.height = "100%";
  document.documentElement.style.boxSizing = "border-box";
}

Snake.prototype.backgroundImage = function (src) {
  this.img = document.createElement("img");
  this.img.src = src;
  this.img.style.position = "absolute";
  this.img.style.width = "100%";
  this.img.style.height = "100%";
  this.img.style.borderRadius = "50%";
  this.container.appendChild(this.img);

}
Snake.prototype.add = function (child) {
  this.container.appendChild(child.container)
}

Snake.prototype.setX = function (value) {
  this.container.style.left = value + "px"
}

Snake.prototype.setY = function (value) {
  this.container.style.top = value + "px"
}
Snake.prototype.setColor = function (value) {
  this.container.style.backgroundColor = value
}
Snake.prototype.borderRadius = function (value) {
  this.container.style.borderRadius = value + "%"
}
Snake.prototype.setWidth = function (value) {
  this.container.style.width = value + "px"
}
Snake.prototype.setHeight = function (value) {
  this.container.style.height = value + "px"
}