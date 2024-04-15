var initializeCollisionHandler = function () {
    var floor = document.querySelector('.collision-block');
    var bird = document.getElementById('bird');
    var birdAborter = birdModule.initializeBirdMovement();
    var topPipe = document.querySelector('.topPipe');
    var bottomPipe = document.querySelector('.bottomPipe');
    var score = 0;
    var passedQ = false;
    var abortHandler;

    function detectCollision() {
        var floory = floor.getBoundingClientRect();
        var birdy = bird.getBoundingClientRect();

        var toppy = topPipe.getBoundingClientRect();
        var bottomy = bottomPipe.getBoundingClientRect();
        var pipeWidth = 50;

        var abortHandlerFunc = function() {
            clearInterval(abortHandler);
        }

        // collision with the floor
        if (birdy.bottom >= floory.top) {
            birdAborter.removeEventListener();
            stopPipes();
            abortHandlerFunc();
            console.log('you splatted on the ground.');
        }

        // collision with the top pipe
        if (
            birdy.right >= toppy.left &&
            birdy.left <= toppy.right &&
            birdy.bottom >= toppy.top &&
            birdy.top <= toppy.bottom
        ) {
            birdAborter.removeEventListener();
            stopPipes();
            abortHandlerFunc();
            console.log('you hit the top pipe.');
        }

        // collision with the bottom pipe
        if (
            birdy.right >= bottomy.left &&
            birdy.left <= bottomy.right &&
            birdy.bottom >= bottomy.top &&
            birdy.top <= bottomy.bottom
        ) {
            birdAborter.removeEventListener();
            stopPipes();
            abortHandlerFunc();
            console.log('you hit the bottom pipe.');
        }

        if (
            birdy.right >= toppy.left + pipeWidth && // passed the left edge of the top pipe
            birdy.left <= toppy.right && //within the horizontal range of the top pipe
            birdy.bottom <= toppy.bottom && // bottom is above the bottom of the top pipe
            birdy.top >= bottomy.top // top is below the top of the bottom pipe
        ) {
            //nothing happens ~ fix required
        }

        // score
        if(!passedQ && birdy.left > toppy.left && birdy.left > bottomy.left){
            passedQ = true
            score++;
            console.log(score)
        }

        if(passedQ && birdy.left < toppy.left && birdy.left < bottomy.left){
            passedQ = false;
        }
    }

    abortHandler = setInterval(detectCollision, 100);
}