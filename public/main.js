var score = 0, pre_score=0, snakeSize=20;
var snake, tail;
var complexity = 1;
(function draw(){
	var ctx = document.getElementById('stage').getContext('2d');
	ctx.canvas.width  = window.innerWidth*0.98;
	ctx.canvas.height = window.innerHeight*0.9;

	var direction = 'right';
	//move the snake
	document.onkeydown = function(event){
		keyCode = event.keyCode;
		switch(keyCode){
			case 37:
				if(direction != 'right'){
					direction = 'left';
					console.log('left');
				}
				break;
			case 39:
				if(direction != 'left'){
					direction = 'right';
					console.log('right');
				}
				break;
			case 38:
				if(direction != 'down'){
					direction = 'up';
					console.log('up');
				}
				break;
			case 40:
				if(direction != 'up'){
					direction = 'down';
					console.log('down');
				}
				break;
		}
	}

	// create square
	var bodySnake = function(x, y){
		ctx.fillStyle = '#268bd2';
        ctx.fillRect(x, y, snakeSize, snakeSize);
	}
	var createFood = function(x, y){
		ctx.fillStyle = '#b58900';
        ctx.fillRect(x, y, snakeSize, snakeSize);
	}
	var scoreText = function() {
        var score_text = "Score: " + score;
        ctx.fillStyle = 'white';
        ctx.font="15px Arial";
        ctx.fillText(score_text, 50, ctx.canvas.height-5);
    }
    var refreshText = function() {
        var refresh_text = "Hit Refresh to start again";
        ctx.fillStyle = 'white';
        ctx.font="30px Arial";
        ctx.fillText(refresh_text, 50, ctx.canvas.height-25);
    }
    var drawSnake = function(){
    	// initialize snake array
    	//var length=2;
    	snake=[];
    	/*for(var i=length; i>=0; i--){
    		snake.push({x:i, y:0});
    	}*/
    	snake.push({x:10, y:10});
    }
    var randomizeFood = function() {
          food = {
            x: Math.floor(Math.random()*ctx.canvas.width),
            y: Math.floor(Math.random()*ctx.canvas.height)
        }
        
        //check for snakes' body
        for (var i=0; i>snake.length; i++) {
            var snakeX = snake[i].x;
            var snakeY = snake[i].y;
            
             if (food.x == snakeX || food.y == snakeY) {
                food.x = Math.floor(Math.random()*ctx.canvas.width);
                food.y = Math.floor(Math.random()*ctx.canvas.height);
            }
        }
    }
    var checkCollision = function(x, y, array) {
        for(var i = 0; i < array.length; i++) {
            if(array[i].x == x && array[i].y == y)
            return true;
        } 
        return false;
    }
    var paint = function () {
    	ctx.fillStyle = '#032f3b';
    	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    	
		//debugger;
	    var snakeX = snake[0].x;
	    var snakeY = snake[0].y;

	    //movement, update snake coordinate
	    if (direction == 'right') {
	        snakeX+=complexity*snakeSize;
	    } else if (direction == 'left') {
	        snakeX-=complexity*snakeSize;
	    } else if (direction == 'up') {
	        snakeY-=complexity*snakeSize;
	    } else if (direction == 'down') {
	        snakeY+=complexity*snakeSize;
	    }

	    //boundary conditions to stop
	    if (snakeX < 0 || snakeX > ctx.canvas.width || snakeY < 0 || snakeY > ctx.canvas.height || checkCollision(snakeX, snakeY, snake)) {
	        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	        scoreText();
	        refreshText();
	        gameloop = clearInterval(gameloop);
	        return;
	    }

	    if ((snakeX >= food.x-snakeSize && snakeX <= food.x+snakeSize) && (snakeY >= food.y-snakeSize && snakeY <= food.y+snakeSize)) {
	    //if (snakeX == food.x && snakeY == food.y) {
	        //new square instead of moving the tail.
	        tail = {
	            x: snakeX,
	            y: snakeY
	        };
	        score++;

	        //new food.
	        randomizeFood();
	    } else {
	    	//pop and paint ahead
	    	tail = snake.pop();
	    	tail.x = snakeX;
        	tail.y = snakeY;
	    }

	    //tail as the first cell.
	    snake.unshift(tail);

	    //each element of the array create a square using the bodySnake
	    for (var i = 0; i < snake.length; i++) {
	    	/*if(snake[1].x!==snake[0].x)
	        	bodySnake(snake[i].x+(i*snakeSize), snake[i].y);
	        else
	        	bodySnake(snake[i].x, snake[i].y+(i*snakeSize));*/
	        bodySnake(snake[i].x, snake[i].y);
	    }

	    createFood(food.x, food.y);

	    //the score text.
	    scoreText();
	}
    drawSnake();
    randomizeFood();
    gameloop = setInterval(paint, 90);
    //createFood(food.x, food.y);
    //scoreText();
    /*bodySnake(5,5);
    bodySnake(5,5+20);
    bodySnake(5,5+40);*/
}
)()