let rod1 = document.getElementById("rod1"); // fetching rods and ball into the variables
let rod2 = document.getElementById("rod2");
let ball = document.getElementById("ball");
let score = document.getElementById("current_score");
const rstbtn = document.getElementById("rstbtn");   // fetching the reset button as well  
var game_board = document.getElementById("game_board");
let gameWidth = game_board.clientWidth;   //  storing the height and width of the game board
let gameHeight = game_board.clientHeight;
let ballX = gameWidth/2;  // intitally coordinates of the ball
let ballY = gameHeight/2;
let ballXDirection = 0; // intial direction of the ball
let ballYDirection = 0;
let current_score = 0;
var bars_speed = 25;  // speed of the movement of the bard in px
var ball_speed = 2;
var top_margin = 0;
var missed = 0;
var myInterval;
rstbtn.addEventListener("click",resetGame);  // adding the event listner to the start and up - down arrow key as well
window.addEventListener("keydown",changeDirection);
function changeDirection(event){ // function for the movement of the bars in upwards and downwards direction
    // console.log("key pressed");
    const keyPressed = event.keyCode;
    const tabUp = 38;
    const tabDown = 40;
    switch(keyPressed){
        case(tabUp):
        
            if (top_margin > 0){
                // console.log(rod1.style.top);
                top_margin-=bars_speed;
                rod1.style.top=top_margin+"px";
                rod2.style.top=top_margin+"px";
            }
            break;
        case (tabDown):
            
            if (top_margin< gameHeight-rod1.clientHeight){
                top_margin+=bars_speed;
                // console.log(rod1.style.top);
                rod1.style.top = top_margin + "px";
                // console.log("move down");
                rod2.style.top =top_margin + "px";
            }
            break;
        
    }
}
// intial alert function before the start of the game
function alert_function() {
    maxScore = localStorage.getItem("storeScore");

    if (maxScore === "null") {
        alert("This is the first time you are playing this game. LET'S START");
        maxScore = 0;
    } else {
        alert("Maximum score of the game is " + maxScore);
    }
};


// function that starts the game 
function startGame(){
    createBall();
    alert_function();
    play_game();
}
startGame();
function play_game(){ // function which handle the whole game by checking the collisions of the balls and also move the ball
    myInterval = setInterval(()=>{
        gameWidth = game_board.clientWidth;
        gameHeight = game_board.clientHeight;
        drawBall(ballX,ballY);
        moveBall();
        checkCollision();
    },10)
}
function checkCollision(){ // functions which check the collisions of the balls with the rod as well as side borders
    if (ballY<=0){
        ballYDirection*=-1;
    }
    if (ballY>=gameHeight){
        ballYDirection*=-1;
    }
    if (ballX<=0){
        createBall();
        missed++;
        if (missed == 5){
            resetGame();
        }
        return ;
    }
    if (ballX>=gameWidth){
        createBall();
        missed++;
        if (missed == 5){
            resetGame();
        }
        return ;
    }
    if (ballX<=rod1.clientWidth){
        
        if (ballY>=parseInt(rod1.style.top) && ballY<=parseInt(rod1.style.top)+rod1.clientHeight){
            ballXDirection*=-1;
            current_score+=100;
            updateScore()
            ballX = rod1.clientWidth;
        }
    }
    if (ballX>=gameWidth-rod2.clientWidth){
        
        if (ballY>=parseInt(rod2.style.top) && ballY<=parseInt(rod2.style.top)+rod2.clientHeight){
            ballXDirection*=-1;
            current_score+=100;
            updateScore();
            ballX = gameWidth - rod2.clientWidth;
        }
    }

}
function createBall(){ // function which intialize the ball from the center of the board
    // selecting the direction of the ball randomly
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
    ballX = gameWidth/2;
    ballY = gameHeight/2;
    drawBall(ballX,ballY);
}
function moveBall(){ // function which leads to move the balls
    ballX = ballX+ball_speed*ballXDirection;
    ballY = ballY +ball_speed*ballYDirection;
}
function drawBall(ballX,ballY){
    ball.style.left = ballX+"px";
    ball.style.top = ballY + "px";

}
// function which continously update the scores of the game
function updateScore(){
    score.textContent = current_score;
}
function resetGame(){// reseting the game from intial 
    rod1.style.top = 0+"px";
    rod2.style.top = "0px";
    ballX = 0;
    ballY = 0;
    ballXDirection = 0;
    ballYDirection = 0;
   
    
    storeWin();
    current_score = 0;
    updateScore();
    missed =0;
    clearInterval(myInterval);
    startGame();
}
function storeWin() { // updating the max score of the game
    var maxScore = localStorage.getItem("storeScore");
    if (current_score > maxScore) {
        maxScore = current_score;
        localStorage.setItem("storeScore", maxScore);
    }

    alert(" You wins with a score of " + (current_score ) + ". Max score is: " + (maxScore));

}
