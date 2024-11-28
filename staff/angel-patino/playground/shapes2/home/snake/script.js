var playBoard = document.querySelector('.game')
var scoreElement = document.querySelector('.score')
var highScoreElement = document.querySelector('.max-score')

var snakeBody = []
var gameOver = false
var foodX, foodY 
var snakeX = 10 
var snakeY = 10
var velocityX = 0
var velocityY = 0
var snakeBody = []
var gameOver = false
var setIntervalId
var score = 0

var highScore = localStorage.getItem('max-score') || 0
highScoreElement.innerHTML = `Max Score: ${highScore}`



function  changeFoodPosition () {
    foodX = Math.floor(Math.random() * 30) + 1
    foodY = Math.floor(Math.random() * 30) + 1
}

function handleGameOver() {
    clearInterval(setIntervalId)
    alert('Game Over')
    location.reload()
}

function changeDirection (e) {
   // console.log(e)
    if(e.key === 'ArrowUp' && velocityY != 1) {
    velocityX = 0
    velocityY = -1
    } else if(e.key === 'ArrowDown' && velocityY != -1) {
    velocityX = 0
    velocityY = 1
    } else if(e.key === 'ArrowLeft' && velocityX != 1) {
    velocityX = -1
    velocityY = 0
    }  else if(e.key === 'ArrowRight' && velocityX != -1) {
    velocityX = 1
    velocityY = 0 
    }

    //iniGame()

}


function iniGame(){
    if(gameOver === true) return handleGameOver()
    var htmlMarkup = `<div class = "food" style= "grid-area: ${foodY} / ${foodX}"></div>`

    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition()
        snakeBody.push([foodX, foodY])
        score++


        highScore = score >= highScore ? score : highScore
        localStorage.setItem('max-score', highScore)
        scoreElement.innerHTML = `Score: ${score}`

        highScoreElement.innerHTML = `Max Score: ${highScore}`
    }

    for(var i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1]
    }

    snakeBody[0] = [snakeX, snakeY]

    snakeX += velocityX
    snakeY += velocityY

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY >30 ) {
        gameOver = true 
    }

    for(var i = 0; i < snakeBody.length; i++){
        htmlMarkup += `<div class = "head" style= "grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`
        if(i !== 0 && snakeBody[0][1] === snakeBody [i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true
        }
    }

     
    playBoard.innerHTML = htmlMarkup

}

changeFoodPosition()
//iniGame()
setIntervalId = setInterval(iniGame, 125) //para que se mueva sin parar la serpiente
document.addEventListener('keydown', changeDirection)