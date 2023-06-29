const canvas = document.getElementById("myGame");
const context = canvas.getContext("2d");
//buttons
const buttons = document.getElementById("buttons")
const leftplayer1 = document.getElementById("left-com");
const rightplayer1 = document.getElementById("right-com");
const leftplayer2 = document.getElementById("left-user");
const rightplayer2 = document.getElementById("right-user");



const width = 400;
const height = 600;


// draw rect funtion
function drawRect(x,y,w,h,color){
    context.fillStyle = color;
    context.fillRect(x,y,w,h);
}


// Draw a circle
function drawCircle(x,y,r,color){
    context.fillStyle = color;
    context.beginPath();
    context.arc(x,y,r,0,Math.PI*2,false);
    context.closePath();
    context.fill();
}

// Create the ball 
const ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    radius: 10,
    speed:0.5,
    velocityX : 5,
    velocityY : 5,
    color: "white"
}

//Create the player2 paddle
const player1 = {
    x: canvas.width/2 - 50/2,
    y: 10,
    width: 80,
    height: 10,
    color: "white",
    score: 0
}



// Create the player1 paddle
const player2 = {
    x: canvas.width/2 - 50/2,
    y: 580,
    width: 80,
    height: 10,
    color: "white",
    score: 0
}

// Center Line
function centerLine(){
    context.beginPath();
    context.setLineDash([10]);
    context.moveTo(0,height/2);
    context.lineTo(width, height/2);
    context.strokeStyle = 'blue';
    context.stroke();
}

// scores
function drawText(text,x,y,color){
    context.fillStyle = color;
    context.font = "32px Josefin Sans";
    context.fillText(text,x,y)
}

// render the game
function render(){
    // make canvas
    drawRect(0, 0, 400, 600,"black");
    // draw center line
    centerLine()
    // draw score
    drawText(player2.score,20,canvas.height/2 + 50,"white");
    drawText(player1.score,20,canvas.height/2 - 30,"white");
    // draw the player2 and player1 pddle
    drawRect(player2.x, player2.y, player2.width, player2.height, player2.color);
    drawRect(player1.x, player1.y, player1.width, player1.height, player1.color)
    // draw the ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}
// // Control the player2 paddle
// canvas.addEventListener("mousemove", movePaddle);

// function movePaddle(e){
//     let rect = canvas.getBoundingClientRect();

//     player2.x = e.clientX - rect.left - player2.width/2;
// }

// control the paddles
window.addEventListener('keydown', control)
function control(e){
    if(e.keyCode === 37){
        if(player1.x > 50){
            player1.x -= 80
        }
    }
    else if(e.keyCode === 39){
        if(player1.x < 310){
            player1.x += 80
        }
        
    }
    else if(e.keyCode === 65){
        if(player2.x > 50){
            player2.x -= 80
        }
    }
    else if(e.keyCode === 68){
        if(player2.x < 310){
            player2.x += 80
        }
        
    }
}

// Control paddles with touch
leftplayer1.addEventListener('click',function(){
    if(player1.x > 50){
        player1.x -= 80
    }
});

rightplayer1.addEventListener('click', function(){
    if(player1.x < 310){
        player1.x += 80
    }
});

leftplayer2.addEventListener('click',function(){
    if(player2.x > 50){
        player2.x -= 80
    }
});

rightplayer2.addEventListener('click', function(){
    if(player2.x < 310){
        player2.x += 80
    }
})



//Game over function
function showGameOver() {
    // Hide Canvas
    canvas.style.display = "none";
    const can = document.getElementById("can");
    can.style.display ="none";
    buttons.style.display="none"
    // Container
    const result = document.getElementById("result");
    result.style.display = "block"
  }

// Collios detection
function collision(b,p){
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

   if(p.right > b.left && p.left < b.right && b.bottom > p.top && b.top < p.bottom){
       return true
   };
       
}

// reset ball for game over
function resetBall(){
    ball.y = canvas.height/2;
    ball.x = canvas.width/2;

    ball.speed = ball.speed+0.2;
    ball.velocityY = -ball.velocityY;

}

//Update 
function update(){
    ball.x += ball.velocityX*ball.speed;
    ball.y += ball.velocityY*ball.speed;
    

    // // Simple AI to control the player1 paddle
    // let player1Level = 0.1
    // player1.x += (ball.x - (player1.x + player1.width/2)) + player1Level;
    // if(ball.speed > 2){
    //     player1.x =+ ball.x + 100
    // }

    if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0){
        ball.velocityX = -ball.velocityX;
    }

    let player = (ball.y < canvas.height/2) ? player1 : player2;

    if(collision(ball,player)){
        ball.velocityY = -ball.velocityY;
        // ball.speed += 0.1;
        console.log(collision(ball,player))
    }

    // points
    if(ball.y - ball.radius < 0){
        // player2 win
        player2.score++;
        resetBall()
    }else if(ball.y + ball.radius > canvas.height){
        // player1 win
        player1.score++;
        resetBall()
    }

    //game over
    if(player2.score > 6 || player1.score > 6){
        clearInterval(loop);
        showGameOver();

    }
}

function game(){
    update();
    render();
}


//loop
const loop = setInterval(game, 1000/50);




