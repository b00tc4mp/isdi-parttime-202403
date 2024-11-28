var initializeEventHandler = function () {
    var birdAborter = initializeBirdMovement();

    var score = 0;
    var passedQ = false;

    var abortHandler = null;

    function detectCollision() {
        var eventHandler = initializeEventHandler();
        // var topPipe = document.querySelector('.topPipe')
        // var bottomPipe = document.querySelector('.bottomPipe');

        var floory = floor.getBoundingClientRect();
        var birdy = bird.getBoundingClientRect();

        // if(!topPipe || !bottomPipe){
        //     console.log('Top or bottom pipe are not available, skipping detection...');
        //     return;
        // }

        // var toppy = topPipe.getBoundingClientRect();
        // var bottomy = bottomPipe.getBoundingClientRect();

        // collision with the floor
        if (birdy.bottom >= floory.bottom) {
            window.cancelAnimationFrame(animationID);
            birdAborter.removeEventListener();
            eventHandler.stop();
            console.log('you splatted on the ground.');
        }

        // // collision with the top pipe
        // if (
        //     birdy.right >= toppy.left &&
        //     birdy.left <= toppy.right &&
        //     birdy.bottom >= toppy.top &&
        //     birdy.top <= toppy.bottom
        // ) {

        //     console.log('you hit the top pipe.');
        // }

        // // collision with the bottom pipe
        // if (
        //     birdy.right >= bottomy.left &&
        //     birdy.left <= bottomy.right &&
        //     birdy.bottom >= bottomy.top &&
        //     birdy.top <= bottomy.bottom
        // ) {

        //     console.log('you hit the bottom pipe.');
        // }

        // // pass between
        // if (
        //     birdy.right >= toppy.left + pipeWidth && // passed the left edge of the top pipe
        //     birdy.left <= toppy.right && //within the horizontal range of the top pipe
        //     birdy.bottom <= toppy.bottom && // bottom is above the bottom of the top pipe
        //     birdy.top >= bottomy.top // top is below the top of the bottom pipe
        // ) {
        //     //nothing happens ~ fix required
        // }

        // // score
        // if(!passedQ && birdy.left > toppy.left && birdy.left > bottomy.left){
        //     passedQ = true
        //     score++;
        //     console.log(score)
        // }

        // if(passedQ && birdy.left < toppy.left && birdy.left < bottomy.left){
        //     passedQ = false;
        // }
    }

    abortHandler = setInterval(detectCollision, 10);

    return {
        stop: function () {
            clearInterval(abortHandler);
            birdAborter.removeEventListener();
        }
    }
}