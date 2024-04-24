function Pipe(height, width) {
    CollidableObject.call(this, height, width);
    this.removeClass('collision-block');
    this.addClass('pipe');
}


Pipe.prototype = Object.create(CollidableObject.prototype);
Pipe.prototype.constructor = Pipe;

Pipe.prototype.createTop = function () {
    this.removeClass('pipe');
    this.addClass('topPipe');
}

Pipe.prototype.createBottom = function (gap) {
    this.removeClass('pipe');
    this.addClass('bottomPipe');
    this.setTopMargin(gap);
}