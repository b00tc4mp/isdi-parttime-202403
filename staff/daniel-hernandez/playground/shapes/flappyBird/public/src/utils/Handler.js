var handler = {
    collisionDetected: false,
    score: 0,
    pipeSetsPassed: [false, false],

    deathType: [
        'floor',
        'pipe',
        'no'
    ],

    deathMessages: {
        'floor': 
        [
        "you've splatted on the ground.", 
        "you forgot to click.", 
        "oops, the bird forgot how to fly.", 
        "gravity wins this round !", 
        "the ground says 'hello'... a bit too aggressively.", 
        "the bird's flight ended with a 'thud'.", 
        "grounded... litteraly.",
        "crash landing, bird style.", 
        "bird's attempt at landing... didn't go as planned.",
        "bird vs. ground: Ground always wins."
        ],

        'pipe': 
        [
        "you slammed into the pipe and died.",
        "the bird didn't quite fit through the pipe.",
        "skill issue ?"
        ],

        'no':
        [
        "you're not supposed to do that...",
        "no.", 
        "uhhh yeah, no.",
        "stop that.",
        "wow."
        ]
    },

    detectCollisions: function (bird, floor, scoreComponent) {
        var birdBounds = bird.getBounds();
        var floorBounds = floor.getBounds();

        var gameFrameBounds = gameFrame.getBounds();

        var topPipe = Array.from(gameFrame.getAll('.topPipe'));
        var bottomPipe = Array.from(gameFrame.getAll('.bottomPipe'));
        // AAB collision detection

        // detect collision with top pipe
        topPipe.forEach(function (pipe) {
            var pipeBounds = pipe.getBoundingClientRect();
            if 
            (
                birdBounds.right >= pipeBounds.left &&
                birdBounds.left <= pipeBounds.right &&
                birdBounds.bottom >= pipeBounds.top &&
                birdBounds.top <= pipeBounds.bottom
            ) {
                handler.collisionDetected = true;
                handler.onCollisionDetected(handler.deathType[1], scoreComponent);
            }
        });

        // detect collision with bottom pipe
        bottomPipe.forEach(function (pipe) {
            var pipeBounds = pipe.getBoundingClientRect();
            if 
            (
                birdBounds.right >= pipeBounds.left &&
                birdBounds.left <= pipeBounds.right &&
                birdBounds.bottom >= pipeBounds.top &&
                birdBounds.top <= pipeBounds.bottom
            ) {
                handler.collisionDetected = true;
                handler.onCollisionDetected(handler.deathType[1], scoreComponent);
            }
        });

        // detect collision with the floor
        if(birdBounds.bottom >= floorBounds.top) {
            handler.collisionDetected = true;
            handler.onCollisionDetected(handler.deathType[0], scoreComponent);
        }

        // detect if above frame
        if (birdBounds.top < gameFrameBounds.top) {
            // check if any pipe passes under the bird while it's above the frame
            var pipesPassed = false;
            topPipe.concat(bottomPipe).forEach(function (pipe) {
                var pipeBounds = pipe.getBoundingClientRect();
                if (bird.velocity < 0 && pipeBounds.left < birdBounds.right) {
                    pipesPassed = true;
                }
            });

            if (pipesPassed) {
                handler.collisionDetected = true;
                handler.onCollisionDetected(handler.deathType[2], scoreComponent);
            }
        }
         
        // score
        topPipe.forEach(function (pipe, index) {
            var pipeBounds = pipe.getBoundingClientRect();
            if(!handler.pipeSetsPassed[index] && birdBounds.left > pipeBounds.right) {
                handler.pipeSetsPassed[index] = true;
                handler.onScore(scoreComponent);
            }

            if(handler.pipeSetsPassed[index] && birdBounds.left < pipeBounds.right) {
                handler.pipeSetsPassed[index] = false;
            }
        })
    },
    
    onCollisionDetected: function (deathType, scoreComponent) {
        var deathMessageArray = handler.deathMessages[deathType];
        var randomIndex = Math.floor(Math.random() * deathMessageArray.length);
        var deathMessage = deathMessageArray[randomIndex];

        //console.log(deathMessage);
        scoreComponent.setText(deathMessage);

        listenerManager.removeAll();

        // death box with current and high score ~ make it account dependant** 
        // restart button
        var scoreBoard = new ScoreBoard();
        gameFrame.add(scoreBoard);
        scoreBoard.setCurrentScore(handler.score);

        // check if score is higher than high score
        var storedHighScore = localStorage.getItem('HighScore');
        if(!storedHighScore || handler.score > parseInt(storedHighScore)) {
            localStorage.setItem('HighScore', JSON.stringify(handler.score));
            scoreBoard.setHighScore(handler.score);
        } else {
            scoreBoard.setHighScore(parseInt(storedHighScore));
        }


        //make bird fall to ground
        animationManager.start(b)

        function b(timestamp) {
            var deltaTime = timestamp - bird.previousFrame;
            bird.previousFrame = timestamp;

            bird.velocity += bird.gravity * deltaTime / 6;
            var birdBottom = parseFloat(bird.getBottom());
            var newBirdBottom = birdBottom - bird.velocity * deltaTime / 6;
            bird.setBottom(newBirdBottom);

            // check if the bird has hit the ground
            if (bird.getBounds().bottom >= floor.getBounds().top) {
                return;
            }
            
            animationManager.start(b)
        }
    },

    onScore: function (scoreComponent) {
        handler.score++;
        scoreComponent.setText(handler.score);
    }
}