var score = 0, snakeSize=20;
var snake, tail;
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
    	var length=4;
    	snake=[];
    	for(var i=length; i>=0; i--){
    		snake.push({x:i, y:0});
    	}
    }
    var randomizeFood = function() {
          food = {
            //Generate random numbers.
            x: Math.floor(Math.random() * ctx.canvas.width),
            y: Math.floor(Math.random() * ctx.canvas.height)
        }
        
        //Look at the position of the snake's body.
        for (var i=0; i>snake.length; i++) {
            var snakeX = snake[i].x;
            var snakeY = snake[i].y;
            
             if (food.x===snakeX || food.y === snakeY || food.y === snakeY && food.x===snakeX) {
                food.x = Math.floor((Math.random() * 30) + 1);
                food.y = Math.floor((Math.random() * 30) + 1);
            }
        }
    }
    var checkCollision = function(x, y, array) {
        for(var i = 0; i < array.length; i++) {
            if(array[i].x === x && array[i].y === y)
            return true;
        } 
        return false;
    }
    var paint = function () {
    	ctx.fillStyle = '#032f3b';
    	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    	
debugger;
	    var snakeX = snake[0].x;
	    var snakeY = snake[0].y;

	    /*
	    Make the snake move.
	    Use a variable ('direction') to control the movement.
	    To move the snake, pop out the last element of the array and shift it on the top as first element.
	    */
	    if (direction == 'right') {
	        snakeX++;
	    } else if (direction == 'left') {
	        snakeX--;
	    } else if (direction == 'up') {
	        snakeY--;
	    } else if (direction == 'down') {
	        snakeY++;
	    }

	    /*
	    If the snake touches the canvas path or itself, it will die!
	    Therefore if x or y of an element of the snake, don't fit inside the canvas, the game will be stopped.
	    If the check_collision is true, it means the the snake has crashed on its body itself, then the game will be stopped again. 
	    */
	    if (snakeX == -1 || snakeX == ctx.canvas.width || snakeY == -1 || snakeY == ctx.canvas.height || checkCollision(snakeX, snakeY, snake)) {
	        //Stop the game.
	        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	        scoreText();
	        refreshText();
	        gameloop = clearInterval(gameloop);
	        return;
	    }

	    //If the snake eats food it becomes longer and this means that, in this case, you shouldn't pop out the last element of the array.
	    if ((snakeX >= food.x-snakeSize && snakeX <= food.x+snakeSize) && (snakeY >= food.y-snakeSize && snakeY <= food.y+snakeSize)) {
	        //Create a new square instead of moving the tail.
	        tail = {
	            x: snakeX,
	            y: snakeY
	        };
	        score++;

	        //Create new food.
	        randomizeFood();
	    } else {
	    	//pop
	    	tail = snake.pop();
	    	tail.x = snakeX;
        	tail.y = snakeY;
	    }

	    //Puts the tail as the first cell.
	    snake.unshift(tail);

	    //For each element of the array create a square using the bodySnake function we created before.
	    for (var i = 0; i < snake.length; i++) {
	    	if(snake.length>1)debugger;
	        bodySnake(snake[i].x, snake[i].y);
	    }

	    createFood(food.x, food.y);

	    //Put the score text.
	    scoreText();
	}
    drawSnake();
    randomizeFood();
    gameloop = setInterval(paint, 5);
    //createFood(food.x, food.y);
    //scoreText();
    /*bodySnake(5,5);
    bodySnake(5,5+20);
    bodySnake(5,5+40);*/
}
)()