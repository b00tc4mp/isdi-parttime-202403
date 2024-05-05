class ScoreBoard extends Div {
  constructor(currentScore) {
    super();
    this.addClass("scoreboard");

    const scoreText = new Paragraph();
    scoreText.addClass("score-text");
    scoreText.setText("score");

    const currentScoreElem = new Div();
    currentScoreElem.addClass("current-score");
    currentScoreElem.setText(0);

    const highScoreText = new Paragraph();
    highScoreText.addClass("high-score-text");
    highScoreText.setText("best");

    const highScore = new Div();
    highScore.addClass("high-score");
    highScore.setText(0);

    const restartButton = new Button();
    restartButton.removeClass("Button");
    restartButton.addClass("restart-button");
    restartButton.setText("restart");

    const x = () => {
      location.reload();
    };

    restartButton.stopListeningAfterClick(x);

    this.add(scoreText);
    this.add(currentScoreElem);
    this.add(highScoreText);
    this.add(highScore);
    this.add(restartButton);
  }

  setCurrentScore(score) {
    const currentScore = this.children[1];

    currentScore.setText(score);
  }

  setHighScore(score) {
    const highScore = this.children[3];

    highScore.setText(score);
  }
}
