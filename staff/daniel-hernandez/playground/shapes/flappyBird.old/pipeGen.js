var frame = document.getElementById('game');
var container = document.getElementById('pipeC');
var pipeGap = 200;
var minPipeHeight = 50;
var moveInterval;
var leftOfFrame = frame.getBoundingClientRect().left - 80; 

var createPipes = function () {
    var maxPipeHeight = frame.clientHeight - minPipeHeight - pipeGap;
    var randHeight = Math.floor(Math.random() * (maxPipeHeight - minPipeHeight + 1)) + minPipeHeight;

    var topPipe = new Pipe(50, frame.clientHeight - randHeight - pipeGap);
    var bottomPipe = new Pipe(50, randHeight);

    topPipe.createTop('.topPipe');
    bottomPipe.createBottom(pipeGap, '.bottomPipe');

    moveContainer();
}

var moveContainer = function () {
    var move = 1;
    moveInterval = setInterval(function () {
        container.style.right = parseInt(container.style.right || leftOfFrame) + move + 'px'
        if (outsideGameFrame(container)) {
            clearInterval(moveInterval);
            container.style.right = leftOfFrame + 'px';
            createPipes();
        }
    }, 1);
}

var outsideGameFrame = function (pipeContainer) {
    var pipeRect = pipeContainer.getBoundingClientRect();
    var frameRect = frame.getBoundingClientRect();
    return pipeRect.right < frameRect.left;
}

var stopPipes = function () {
    clearInterval(moveInterval)
}