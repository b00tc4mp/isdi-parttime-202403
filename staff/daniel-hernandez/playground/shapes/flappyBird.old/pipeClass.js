function Pipe (width, height) {
    this.width = width;
    this.height = height;
}

Pipe.prototype.createTop = function (classID) {
    var topPipe = document.querySelector(classID);
    //topPipe.style.backgroundColor = 'red';
    //topPipe.style.border = '1px red solid';
    topPipe.style.height = this.height + 'px';
    topPipe.style.width = this.width + 'px';

    return topPipe;
}

Pipe.prototype.createBottom = function (gap, classID) {
    var bottomPipe = document.querySelector(classID);
    //bottomPipe.style.backgroundColor = 'gold';
    //bottomPipe.style.border = '1px blue solid';
    bottomPipe.style.height = this.height + 'px';
    bottomPipe.style.width = this.width + 'px';
    bottomPipe.style.marginTop = gap + 'px';

    return bottomPipe;
}