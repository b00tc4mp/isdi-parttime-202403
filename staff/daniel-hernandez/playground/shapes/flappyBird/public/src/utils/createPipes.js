var pipeWidth = 50;
var pipeGap = 190; // 200 
var minPipeHeight = 50;

var createPipes = function (numSets, gameFrame, gameFrameElement, spawnPosition) {
    var createSet = function (offset) {
        var maxPipeHeight = gameFrameElement.clientHeight - minPipeHeight - pipeGap;
        var randHeight = Math.floor(Math.random() * (maxPipeHeight - minPipeHeight + 1)) + minPipeHeight;

        var pipeContainer = new Pipe(gameFrameElement.clientHeight, pipeWidth);
        pipeContainer.setRight(offset);
        gameFrame.add(pipeContainer);

        var topPipe = new Pipe(gameFrameElement.clientHeight - randHeight - pipeGap, pipeWidth);
        topPipe.createTop();
        pipeContainer.add(topPipe);

        var bottomPipe = new Pipe(randHeight, pipeWidth);
        bottomPipe.createBottom(pipeGap);
        pipeContainer.add(bottomPipe);
    }

    for(var i = 0; i < numSets; i++){
        createSet(spawnPosition);
    }
}

var outsideGameFrame = function (pipeContainer, gameFrame) {
    var pipeRect = pipeContainer.getBoundingClientRect();
    var frameRect = gameFrame.getBounds();
    return pipeRect.right < frameRect.left;
}