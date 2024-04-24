function Label() {
    Component.call(this, 'label');
    
}

Label.prototype = Object.create(Component.prototype);
Label.prototype.constructor = Label;

Label.prototype.setHtmlFor = function (ID) {
    this.container.htmlFor = ID;
}