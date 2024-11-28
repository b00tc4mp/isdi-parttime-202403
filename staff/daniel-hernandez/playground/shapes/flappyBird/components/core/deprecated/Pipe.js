function Pipe(height, width) {
    Div.call(this);
    this.addClass('pipe');
    this.setHeight(height);
    this.setWidth(width);
}

Pipe.prototype = Object.create(Div.prototype);
Pipe.prototype.constructor = Pipe;


Pipe.prototype.createTop = function (pipeContainer) {
    this.removeClass('pipe');
    this.addClass('topPipe')
}

Pipe.prototype.createBottom = function (gap, pipeContainer) {
    this.removeClass('pipe');
    this.addClass('bottomPipe');
    this.setTopMargin(gap);
}