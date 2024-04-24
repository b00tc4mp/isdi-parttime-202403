function CollidableObject(height, width) {
    Div.call(this);
    this.addClass('collision-block');
    this.setHeight(height);
    this.setWidth(width);
}

CollidableObject.prototype = Object.create(Div.prototype);
CollidableObject.prototype.constructor = CollidableObject;