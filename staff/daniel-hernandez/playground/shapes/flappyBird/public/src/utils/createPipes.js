const pipeWidth = 50;
const pipeGap = 190; // 200
const minPipeHeight = 50;

const createPipes = (numSets, gameFrame, gameFrameElement, spawnPosition) => {
  const createSet = (offset) => {
    const maxPipeHeight =
      gameFrameElement.clientHeight - minPipeHeight - pipeGap;
    const randHeight =
      Math.floor(Math.random() * (maxPipeHeight - minPipeHeight + 1)) +
      minPipeHeight;

    const pipeContainer = new Pipe(gameFrameElement.clientHeight, pipeWidth);
    pipeContainer.setRight(offset);
    gameFrame.add(pipeContainer);

    const topPipe = new Pipe(
      gameFrameElement.clientHeight - randHeight - pipeGap,
      pipeWidth,
    );
    topPipe.createTop();
    pipeContainer.add(topPipe);

    const bottomPipe = new Pipe(randHeight, pipeWidth);
    bottomPipe.createBottom(pipeGap);
    pipeContainer.add(bottomPipe);
  };

  for (let i = 0; i < numSets; i++) {
    createSet(spawnPosition);
  }
};

const outsideGameFrame = (pipeContainer, gameFrame) => {
  const pipeRect = pipeContainer.getBoundingClientRect();
  const frameRect = gameFrame.getBounds();
  return pipeRect.right < frameRect.left;
};
