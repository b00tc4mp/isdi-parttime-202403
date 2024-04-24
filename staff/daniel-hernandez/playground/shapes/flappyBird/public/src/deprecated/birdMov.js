var velocity = 0;
var velocityUp = 5;
var gravity = 0.1;

var previousFrame = 0; //for timestamp ~ request animation frame
var animationID = null;

var bird = null;
var floor = null;

var initializeBirdMovement = function () {
    bird = document.querySelector('.bird');
    floor = document.querySelector('.collision-block');

    var clickHandler = function () {
        console.log('clicked')
        onClick();
        animationID = requestAnimationFrame(updateBirdPosition);
    }

    document.addEventListener('click', clickHandler);
    
    return {
        removeEventListener: function () {
            document.removeEventListener('click', clickHandler);
        }
    }
}

var onClick = function () {
    velocity = -velocityUp;
}

var updateBirdPosition = function (timestamp) {
    if (!previousFrame) {
        previousFrame = timestamp;
    }

    var deltaTime = timestamp - previousFrame;
    previousFrame = timestamp;

    var birdBounds = bird.getBoundingClientRect();
    var floorBounds = floor.getBoundingClientRect();

    velocity += gravity * deltaTime / 6;

    var bottom = parseFloat(getComputedStyle(bird).bottom);
    var newBottom = bottom - velocity * deltaTime / 6;
    bird.style.bottom = newBottom + 'px';

    animationID = requestAnimationFrame(updateBirdPosition);
}