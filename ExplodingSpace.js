
    var canvas, canvasContext;

    window.onload = function() {
        canvas = document.getElementById('gameCanvas');
        canvasContext = canvas.getContext('2d');

        document.addEventListener('keydown', keyPressed);
        document.addEventListener('keyup', keyReleased);


        setInterval(mainloop, 1000 / 50);
    } // end func

    var userName = '';
    while (userName == '' || userName == null) {
        userName = prompt('What is your name? The objective in the game is to dodge the asteroids. If you get touched by the asteroids you die. There is a restart button on the bottom right. To move use the WASD keys on the keyboard. Have fun and good luck!', '') //tony
    }

    var difficulty = '';
    var pass = false;

    while (pass == false) {
        difficulty = prompt('Choose your difficulty: easy, medium, hard', '')
        if (difficulty == null) {
            difficulty = '';
        }
        if (difficulty.toLowerCase() == 'easy' || difficulty.toLowerCase() == 'medium' || difficulty.toLowerCase() == 'hard') {
            pass = true;
        }
    }// end func


    function mainloop() { // loop runs code 50 times per secound
        if (gameRun) {

            colorRect(0,0,canvas.width,canvas.height,'black') //bg
            drawImage(shipspace,playerXpos, playerYpos, PLAYERSIZE, PLAYERSIZE, 'red');
            // colorRect(enemyXpos, enemyYpos, ENEMYSIZE, ENEMYSIZE, 'orange');

            drawText('score: ' + score, 0, 20, '20px Ariel', 'white');
            // drawText('deaths: ' + deaths, canvas.width - 100, 20, '20px Ariel', 'red');

            if (setUp) {
                for (i = 0; i < totalenemys; i++) {
                    randenemy();
                    playerYpos = canvas.height - PLAYERSIZE;
                    playerXpos = canvas.width / 2;
                }
                setUp = false;
            }

            playermove();
            enemydraw();
            enemymove();
            bulletShoot();

        } else {
            colorRect(0, 0, canvas.width, canvas.height, 'black');
            drawText('Game Over!: ' + score, 2, canvas.height / 2, '50px Ariel', 'white');

        }
    }// end func 



    var asteroid = new Image();
    asteroid.src = 'images/asteroid.png';

    var shipspace = new Image();
    shipspace.src = 'images/shipspace.png';



    // player variables
    var playerXpos = 10;
    var playerYpos = 100;
    var playerXspeed = 5;
    var playerYspeed = 5;
    const PLAYERSIZE = 50;

    // enemy 1 variables 
    var enemyXpos = 5;
    var enemyYpos = 5;
    var enemyXspeed = 2;
    var enemyYspeed = 2;
    var ENEMYSIZE = 20;

    var enemys = [];

    // key codes
    const W_KEY = 87;
    const A_KEY = 65;
    const S_KEY = 83;
    const D_KEY = 68;
    const SPACE_KEY = 32;
    var WKeyPressed = false;
    var AKeyPressed = false;
    var SKeyPressed = false;
    var DKeyPressed = false;

    // Sound effects
    var OverSound;


    var setUp = true;
    var score = 0;
    // var deaths = 0;
    var gameRun = true;
    var deaths = 0;
    var totalenemys = 0;



    //player movement
    function keyPressed(evt) {
        if (evt.keyCode == W_KEY) {
            WKeyPressed = true;
        }
        if (evt.keyCode == A_KEY) {
            AKeyPressed = true;
        }
        if (evt.keyCode == S_KEY) {
            SKeyPressed = true;
        }
        if (evt.keyCode == D_KEY) {
            DKeyPressed = true;
        }
        if (evt.keyCode == SPACE_KEY) {
            shooting = true;
        }
    } // end func 


    //player not moving
    function keyReleased(evt) {
        if (evt.keyCode == W_KEY) {
            WKeyPressed = false;
        }
        if (evt.keyCode == A_KEY) {
            AKeyPressed = false;
        }
        if (evt.keyCode == S_KEY) {
            SKeyPressed = false;
        }
        if (evt.keyCode == D_KEY) {
            DKeyPressed = false;
        }
    } // end func 



    //player movement
    function playermove() {
        if (DKeyPressed && playerXpos < canvas.width - PLAYERSIZE) {
            playerXpos += playerXspeed; //player moves right
        }

        if (AKeyPressed && playerXpos > 0) {
            playerXpos -= playerXspeed;
            if (playerXpos < 0 - PLAYERSIZE) {
                playerXpos = canvas.width - PLAYERSIZE / 2; // player moves left
            }
        }

        if (WKeyPressed && playerYpos > 0) {
            playerYpos -= playerYspeed; // player moves up
        }

        if (SKeyPressed && playerYpos < canvas.height - PLAYERSIZE) {
            playerYpos += playerYspeed; //player moves down
        }
    } // end func 




    //draws the ememys 
    function enemydraw() {
        enemys.forEach(function(brick, i) {
            drawImage(asteroid,brick.enemyXpos, brick.enemyYpos, brick.ENEMYSIZE, brick.ENEMYSIZE);
        });
    } // end func 

    //makes the ememys move
    function enemymove() {
        enemys.forEach(function(brick, index, array) {
            brick.enemyYpos += brick.enemyYspeed;

            //makes them move down
            if (brick.enemyYpos > 0) {
                brick.enemyYspeed *= 1;
            }

            if (brick.enemyYpos + brick.ENEMYSIZE > playerYpos && brick.enemyYpos < playerYpos + PLAYERSIZE && brick.enemyXpos + brick.ENEMYSIZE > playerXpos && brick.enemyXpos < playerXpos + PLAYERSIZE) {
                deaths++;
                brick.enemyYpos = 0;
                brick.enemyXpos = Math.floor(Math.random() * (canvas.width - ENEMYSIZE));
                console.log('deaths:' + deaths);

                if (deaths >= 1) {
                    gameRun = false;
                }

            }

            // makes the enemys back to the top
            if (brick.enemyYpos > canvas.height) {
                brick.enemyYpos = 0; //makes enemies go back to the top of the screen
                score++;
                brick.enemyXpos = Math.floor(Math.random() * (canvas.width - ENEMYSIZE)); // spawns in at random spots on the at y = 0
            }
        });

    } // end func 


    function randenemy() {

        // enemy variables
        var ENEMYSIZE = Math.floor(Math.random() * (40 - 10) + 10);
        var enemyXpos = Math.floor(Math.random() * (canvas.width - ENEMYSIZE));
        var enemyYpos = 0;
        var enemyXspeed = 0;
        var enemyYspeed = Math.floor(Math.random() * (10 - 5) + 2);
  
        var newenemy = {
            enemyXpos: enemyXpos,
            enemyYpos: enemyYpos,
            ENEMYSIZE: ENEMYSIZE,
            enemyYspeed: enemyYspeed,
            enemyXspeed: enemyXspeed
        }
        enemys.push(newenemy);
    } // end func 



    //difficulty
    if (difficulty.toLowerCase() == 'easy') {
        totalenemys = 5;
    }

    if (difficulty.toLowerCase() == 'medium') {
        totalenemys = 10;
    }

    if (difficulty.toLowerCase() == 'hard') {
        totalenemys = 15;
    }


     //Restart Button
     function reload() { //called from button pushed-->//
         location.reload(); //runs code that refreshes page-->//
    }


    //func to draw colored rects on canvas
    function colorRect(x, y, w, h, c) {
        canvasContext.fillStyle = c;
        canvasContext.fillRect(x, y, w, h);
    } // end func 

    function drawText(msg, x, y, f, c) {
        canvasContext.fillStyle = c;
        canvasContext.font = f;
        canvasContext.fillText(msg, x, y);
    } // end func 

    function drawImage(src,x,y,w,h){
        canvasContext.drawImage(src,x,y,w,h);
    } // end func


