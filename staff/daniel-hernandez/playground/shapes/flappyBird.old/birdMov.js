var birdModule = {
    velocity: 0,
    velocityUp: 5,
    gravity : 0.1,
    previousFrame: 0,
    animationID: null,
    bird: null,
    floor: null,
    click: false,

    initializeBirdMovement: function () {
        birdModule.bird = document.getElementById('bird');
        birdModule.floor = document.querySelector('.collision-block');
        birdModule.animationID = requestAnimationFrame(birdModule.updateBirdPosition);

        var clickHandler = function () {
            birdModule.onClick();
            birdModule.click = true;
        }

        document.addEventListener('click', clickHandler);

        
        return {
            removeEventListener : function () {
                document.removeEventListener('click', clickHandler);
            }
        }
    },

    onClick: function () {
        birdModule.velocity = -birdModule.velocityUp;
    },

    updateBirdPosition: function (timestamp) {
        if (!birdModule.click) {
            birdModule.animationID = requestAnimationFrame(birdModule.updateBirdPosition);
            return;
        }

        if (!birdModule.previousFrame) {
            birdModule.previousFrame = timestamp;
        }

        var deltaTime = timestamp - birdModule.previousFrame;
        birdModule.previousFrame = timestamp;

        var birdBounds = birdModule.bird.getBoundingClientRect();
        var floorBounds = birdModule.floor.getBoundingClientRect();
        
        birdModule.velocity += birdModule.gravity * deltaTime / 6;

        var bottom = parseFloat(getComputedStyle(birdModule.bird).bottom);
        var newBottom = bottom - birdModule.velocity * deltaTime / 6;
        if(birdBounds.bottom >= floorBounds.top){
            return;
        }
        birdModule.bird.style.bottom = newBottom + 'px';


        birdModule.animationID = requestAnimationFrame(birdModule.updateBirdPosition);
    }
}