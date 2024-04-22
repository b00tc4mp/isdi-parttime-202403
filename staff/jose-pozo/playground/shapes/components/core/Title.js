function Header(value) {
    Component.call(this, 'h' + value)
}

Header.prototype = Object.create(Component.prototype)
Header.prototype.constructor = Header