var body;
var gameFrame;
var gameFrameElement;

var bird;
var floor;
var score;

var animationManager = new AnimationManager();
var listenerManager = new ListenerManager();

function init() {
    body = new Component(document.body);

    gameFrame = new Div();
    gameFrame.addClass('game-container');

    bird = new Bird();
    var birdImg = new Img('../assets/not-found-box.svg');

    floor = new Floor();

    score = new Div();
    score.addClass('score-display');
    score.setText(0);

    body.add(gameFrame);
    bird.add(birdImg);
    gameFrame.add(bird);
    gameFrame.add(floor);
    gameFrame.add(score);

    gameFrameElement = gameFrame.getElement();
    listenerManager.add(gameFrameElement, 'click', bird.jump.bind(bird), false);

    bodyElement = body.getElement();
    function b (event) {
        if(event.keyCode === 32) {
            bird.jump();
        }
    }
    listenerManager.add(bodyElement, 'keydown', b, false);

    function a () {
        createPipes(1, gameFrame, gameFrameElement, bird.getBounds().right - 300);
        listenerManager.remove(gameFrameElement, 'click', a, false);
        listenerManager.remove(bodyElement, 'keydown', a, false);
    }
    // gameFrame.stopListeningAfterClick(a);
    listenerManager.add(gameFrameElement, 'click', a, false);
    listenerManager.add(bodyElement, 'keydown', a, false);
}

function startGame() {
    init();
    animationManager.start(gameLoop);
}

var FIXED_TIME_STEP = 1000 / 240; // 240fps
var accumulator = 0
var activePipes =  1;

function gameLoop(timestamp) {
    accumulator += timestamp - (gameLoop.lastTime || timestamp);
    gameLoop.lastTime = timestamp;

    while(accumulator >= FIXED_TIME_STEP) {
        handler.detectCollisions(bird, floor, score);

        if(handler.collisionDetected) {
            return; // end game if collision is detected
        }

        // update bird position
        var deltaTime = FIXED_TIME_STEP;
        bird.previousFrame = timestamp;
            
        if(bird.hasJumped) {
            bird.velocity += bird.gravity * deltaTime / 6;
        }
        
        var birdBottom = parseFloat(bird.getBottom());
        var newBirdBottom = birdBottom - bird.velocity * deltaTime / 6;

        bird.setBottom(newBirdBottom);

        // update pipes
        SPAWN = bird.getBounds().right - 300;
        var spawnPosition = SPAWN;
        
        var move = 1;
        var centerReached = false;
        var pipeContainers = gameFrame.getAll('.pipe');
        pipeContainers.forEach(function (pipeContainer) {
            var currentRight = parseInt(pipeContainer.style.right) || SPAWN;
            var newRight = currentRight + move;
            pipeContainer.style.right = newRight + 'px';


            // if pipe is outside frame
            if(outsideGameFrame(pipeContainer, gameFrame)) {
                pipeContainer.remove();
                activePipes--;
                if(activePipes < 2) {
                    createPipes(1, gameFrame,gameFrameElement, spawnPosition);
                    activePipes++;
                }
            }

            // if pipe has reached the center
            if(pipeContainer.getBoundingClientRect().right < bird.getBounds().right && !centerReached) {
                if(activePipes < 2){
                    createPipes(1, gameFrame, gameFrameElement, spawnPosition);
                    activePipes++;
                }
            }
            centerReached = true;
        });
        
        accumulator -= FIXED_TIME_STEP;
    }

    animationManager.start(gameLoop);
}

window.onload = startGame;