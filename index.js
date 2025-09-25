const gameBox = document.querySelector("#gamebox");
const cntx = gameBox.getContext("2d");
const scoreText = document.querySelector("#scoretext");
const restartBtn = document.querySelector("#retsartbtn");
const pausedBtn = document.querySelector("#pausedbtn");
const resumeBtn = document.querySelector("#resumetbtn");
const gameWidth = gameBox.width;
const gameHeight = gameBox.height;
const gameBoxBGcolor = "forestgreen";
const paddle1Color = "lightblue";
const paddle2Color = "red";
const paddleBorder = "black";
const ballColor = "yellow";
const ballBorder = "black";
const ballRadius = 12.5;
const paddleSpeed = 60;
let intervalId;
let ballSpeed;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
let player2Score = 0;
let paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0
};

let paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth -25,
    y: gameHeight - 100
};


window.addEventListener("keydown", changeDirection);
restartBtn.addEventListener("click", restartGame);
pausedBtn.addEventListener("click", pauseGame);
resumeBtn.addEventListener("click", resumeGame);

startGame();


function startGame(){
    createBall();
    nextTick();
};
function nextTick(){
    intervalId = setTimeout(() => {
        clearBorad();
        drawBall(ballX,ballY);
        drawPaddles();
        moveBall();
        checkCollision();
        nextTick();
    }, 10);
};
function clearBorad() {
    cntx.fillStyle = gameBoxBGcolor;
    cntx.fillRect(0, 0, gameWidth, gameHeight);
}
function drawPaddles(){
    cntx.strokeStyle = paddleBorder;

    cntx.fillStyle = paddle1Color;
    cntx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    cntx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

    cntx.fillStyle = paddle2Color;
    cntx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    cntx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
};
function drawBall(ballX, ballY){
    cntx.fillStyle = ballColor;
    cntx.strokeStyle = ballBorder;
    cntx.lineWidth = 2;
    cntx.beginPath();
    cntx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    cntx.stroke();
    cntx.fill();
};
function createBall() {
    ballSpeed = 1;
    if (Math.round(Math.random()) == 1){
        ballXDirection = 1;
    }
    else{
        ballXDirection = -1;
    }
    if (Math.round(Math.random()) == 1){
        ballYDirection = 1;
    }
    else{
        ballYDirection = -1;
    }
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    drawBall(ballX, ballY);
}
function moveBall(){
    ballX += (ballSpeed * ballXDirection);
    ballY += (ballSpeed * ballYDirection);
};
function checkCollision(){
    if(ballY <= 0 + ballRadius){
        ballYDirection *= -1;
    }
    if (ballY >= gameHeight - ballRadius){
        ballYDirection *= -1;
    }
    if(ballX <= 0){
        player2Score +=1;
        updateScore();
        createBall();
        return;
    }
    if(ballX >= gameWidth){
        player1Score +=1;
        updateScore();
        createBall();
        return;
    }
    if (ballX <= (paddle1.x + paddle1.width + ballRadius)) {
        if(ballY > paddle1.y && ballY < paddle1.y + paddle1.height) {
            ballX = (paddle1.x + paddle1.width) + ballRadius;//If it get stuck at the buttom
            ballXDirection *= -1;
            ballSpeed +=1;
        }
    }
    if (ballX >= (paddle2.x - ballRadius)) {
        if(ballY > paddle2.y && ballY < paddle2.y + paddle2.height) {
            ballX = paddle2.x - ballRadius;//If it get stuck at the buttom
            ballXDirection *= -1;
            ballSpeed +=1;
        }
    }
}
function changeDirection(event){
    const keyPressed = event.keyCode;
    const paddle1Up = 87;
    const paddle1Down = 83;
    const paddle2Up = 38;
    const paddle2Down = 40;

    switch(keyPressed){
        case(paddle1Up):
        if(paddle1.y > 0) {
            paddle1.y -= paddleSpeed;
        }
        break;
        case(paddle1Down):
            if(paddle1.y < gameHeight - paddle1.height){
                paddle1.y += paddleSpeed;
            }
            break;
        case(paddle2Up):
        if(paddle2.y > 0) {
            paddle2.y -= paddleSpeed;
        }
        break;
        case(paddle2Down):
            if(paddle2.y < gameHeight - paddle2.height){
                paddle2.y += paddleSpeed;
            }
            break;
        }
    };
function updateScore() {
    scoreText.textContent = `${player1Score}:${player2Score}`
};
function pauseGame() {
    clearInterval(intervalId);
    cntx.font = "50px cursive";
    cntx.fillStyle = "black";
    cntx.textAlign = "center";
    cntx.fillText("PAUSED", gameWidth / 2, gameHeight / 2);
};
function resumeGame() {
    nextTick();
};
function restartGame() {
    player1Score = 0;
    player2Score = 0;
    let paddle1 = {
        width: 25,
        height: 100,
        x: 0,
        y: 0
    };
    let paddle2 = {
        width: 25,
        height: 100,
        x: gameWidth -25,
        y: gameHeight - 100
    };
    updateScore();
    clearInterval(intervalId);
    startGame();
};
