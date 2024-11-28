let body;
let gameFrame;
let gameFrameElement;

let bird;
let floor;
let score;

const animationManager = AnimationManager();
const listenerManager = ListenerManager();

const init = () => {
  if (!logic.isUserLoggedIn()) {
    location.href = "../../login/index.html";
  }

  body = new Component(document.body);

  // nav-bar
  const navBar = new Div();
  navBar.addClass("nav-bar");
  const username = logic.getUsername();
  const usernameDisplay = new Paragraph();
  usernameDisplay.setText(username);
  const logoutButton = new Button();
  logoutButton.addClass("restart-button");
  logoutButton.setText("logout");
  logoutButton.stopListeningAfterClick(() => {
    logic.logoutUser();

    location.href = "../../login/index.html";
    console.log("logged out user");
  });

  body.add(navBar);
  navBar.add(logoutButton);
  navBar.add(usernameDisplay);

  gameFrame = new Div();
  gameFrame.addClass("game-container");

  bird = new Bird();
  handler.collisionDetected = false;
  handler.score = 0;
  handler.pipeSetsPassed = [false, false];
  const birdImg = new Img("../assets/not-found-box.svg");

  floor = new Floor();

  score = new Div();
  score.addClass("score-display");
  score.setText(0);

  body.add(gameFrame);
  bird.add(birdImg);
  gameFrame.add(bird);
  gameFrame.add(floor);
  gameFrame.add(score);

  gameFrameElement = gameFrame.getElement();
  listenerManager.add(gameFrameElement, "click", bird.jump.bind(bird), false);

  const a = () => {
    createPipes(1, gameFrame, gameFrameElement, bird.getBounds().right - 300);
    listenerManager.remove(gameFrameElement, "click", a, false);
  };

  listenerManager.add(gameFrameElement, "click", a, false);
};

const startGame = () => {
  init();
  animationManager.start(gameLoop);
};

const FIXED_TIME_STEP = 1000 / 240; // 240fps
let accumulator = 0;
let activePipes = 1;

const gameLoop = (timestamp) => {
  accumulator += timestamp - (gameLoop.lastTime || timestamp);
  gameLoop.lastTime = timestamp;

  while (accumulator >= FIXED_TIME_STEP) {
    handler.detectCollisions(bird, floor, score);

    if (handler.collisionDetected) {
      activePipes = 1;
      return; // end game if collision is detected
    }

    // update bird position
    const deltaTime = FIXED_TIME_STEP;
    bird.previousFrame = timestamp;

    if (bird.hasJumped) {
      bird.velocity += (bird.gravity * deltaTime) / 6;
    }

    const birdBottom = parseFloat(bird.getBottom());
    const newBirdBottom = birdBottom - (bird.velocity * deltaTime) / 6;
    bird.setBottom(newBirdBottom);

    // update pipes
    SPAWN = bird.getBounds().right - 300;
    const spawnPosition = SPAWN;

    let move = 1;
    let centerReached = false;
    const pipeContainers = gameFrame.getAll(".pipe");
    pipeContainers.forEach((pipeContainer) => {
      const currentRight = parseInt(pipeContainer.style.right) || SPAWN;
      const newRight = currentRight + move;
      pipeContainer.style.right = newRight + "px";

      // if pipe is outside frame
      if (outsideGameFrame(pipeContainer, gameFrame)) {
        pipeContainer.remove();
        activePipes--;
        if (activePipes < 2) {
          createPipes(1, gameFrame, gameFrameElement, spawnPosition);
          activePipes++;
        }
      }

      // if pipe has reached the center
      if (
        pipeContainer.getBoundingClientRect().right < bird.getBounds().right &&
        !centerReached
      ) {
        if (activePipes < 2) {
          createPipes(1, gameFrame, gameFrameElement, spawnPosition);
          activePipes++;
        }
      }
      centerReached = true;
    });

    accumulator -= FIXED_TIME_STEP;
  }

  animationManager.start(gameLoop);
};

window.onload = startGame;
