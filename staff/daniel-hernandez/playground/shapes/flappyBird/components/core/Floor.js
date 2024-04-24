function Floor() {
    CollidableObject.call(this, 10, 450);
    this.removeClass('collision-block');
    this.addClass('floor');
}

Floor.prototype = Object.create(CollidableObject.prototype);
Floor.prototype.constructor = Floor;