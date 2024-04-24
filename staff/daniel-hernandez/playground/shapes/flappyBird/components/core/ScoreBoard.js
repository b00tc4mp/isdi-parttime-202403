function ScoreBoard(currentScore) {
    Div.call(this);
    this.addClass('scoreboard');

    var scoreText = new Paragraph();
    scoreText.addClass('score-text');
    scoreText.setText('score');

    var currentScore = new Div();
    currentScore.addClass('current-score');
    currentScore.setText(0);

    var highScoreText = new Paragraph();
    highScoreText.addClass('high-score-text');
    highScoreText.setText('best');

    var highScore = new Div();
    highScore.addClass('high-score');
    highScore.setText(0);

    var restartButton = new Button();
    restartButton.removeClass('Button');
    restartButton.addClass('restart-button');
    restartButton.setText('restart');

    function x() {
        location.reload();
    }

    restartButton.stopListeningAfterClick(x);

    this.add(scoreText);
    this.add(currentScore);
    this.add(highScoreText);
    this.add(highScore);
    this.add(restartButton);
}

ScoreBoard.prototype = Object.create(Div.prototype);
ScoreBoard.prototype.constructor = ScoreBoard;

ScoreBoard.prototype.setCurrentScore = function (score) {
    var currentScore = this.children[1]; 

    currentScore.setText(score);
}

ScoreBoard.prototype.setHighScore = function (score) {
    var highScore = this.children[3];

    highScore.setText(score); 
}