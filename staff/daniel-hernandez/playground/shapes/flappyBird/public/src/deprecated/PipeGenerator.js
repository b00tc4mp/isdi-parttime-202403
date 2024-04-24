var gameFrame = null;
var gameFrameRect = null;
var leftOfFrame = null;

var pipeWidth = 50;
var pipeGap = 200;
var minPipeHeight = 50;

var updateInterval;

var initializePipeGenerator = function () {
    gameFrame = document.querySelector('.game-container');
    gameFrameRect = gameFrame.getBoundingClientRect();
    leftOfFrame = gameFrameRect.left - 80;

    var clickHandler = function () {
        createPipes(1);
        document.removeEventListener('click', clickHandler);
    }

    document.addEventListener('click', clickHandler);
}


var createPipes = function (numSets) {
    var createSet = function (offset) {
        var maxPipeHeight = gameFrame.clientHeight - minPipeHeight - pipeGap;
        var randHeight = Math.floor(Math.random() * (maxPipeHeight - minPipeHeight + 1)) + minPipeHeight;

        var pipeContainer = new Pipe(gameFrame.clientHeight, pipeWidth);
        pipeContainer.container.style.right = offset + 'px';

        var gameFrameComponent = new Component(gameFrame);
        gameFrameComponent.add(pipeContainer);

        var topPipe = new Pipe(gameFrame.clientHeight - randHeight - pipeGap, pipeWidth);
        topPipe.createTop(pipeContainer);
        pipeContainer.add(topPipe);

        var bottomPipe = new Pipe(randHeight, pipeWidth);
        bottomPipe.createBottom(pipeGap);
        pipeContainer.add(bottomPipe);
    }

    var initialOffset = leftOfFrame;
    var distanceBetweenSets = 300;

    for(var i = 0; i < numSets; i++){
        createSet(initialOffset + (i * distanceBetweenSets));
    }

    updatePipes();
}

var updating = false;
var updatePipes = function () {
    if(updating) return;
    updating = true;
    var move = 1;
    var centerReached = false;

    updateInterval = setInterval(function () {
        var pipeContainers = document.querySelectorAll('.pipe');
        pipeContainers.forEach(function (pipeContainer) {
            pipeContainer.style.right = (parseInt(pipeContainer.style.right || leftOfFrame) + move) + 'px';

            // if pipe is outside frame
            if(outsideGameFrame(pipeContainer)){
                pipeContainer.remove();
                clearInterval(updateInterval);
                updating = false;
                updatePipes();
                return;
            }

            // if pipe has reached the center
            if(pipeContainer.getBoundingClientRect().right < gameFrame.clientWidth && pipeContainers.length === 1){
                if(!centerReached) {
                    setTimeout(function () { createPipes(1); }, 600);
                    centerReached = true;
                }
            }
        });
    }, 5);
}

var outsideGameFrame = function (pipeContainer) {
    var pipeRect = pipeContainer.getBoundingClientRect();
    var frameRect = gameFrame.getBoundingClientRect();
    return pipeRect.right < frameRect.left;
}