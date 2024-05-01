function Heading(level) {
    Component.call(this, 'h' + level)

    this.addClass('Heading')
}

Heading.prototype = Object.create(Component.prototype)
Heading.prototype.constructor = Heading