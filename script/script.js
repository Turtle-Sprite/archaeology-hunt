

//Vars for updating innerText
let volcanoTimer = document.getElementById('volcano-timer')
let artifactCounter = document.getElementById('artifacts-counter')
let playerMessage = document.getElementById('player-message')

//Vars for hiding start/game/reset elements
let topLeft = document.getElementById('top-left')
let topRight = document.getElementById('top-right')
let leftBumper = document.getElementById('left-bumper')
let rightBumper = document.getElementById('right-bumper')
let canvas = document.querySelector('canvas')
let main = document.querySelector('main')
let bottom = document.getElementById('bottom')
let startBtn = document.getElementById('start')
let resetBtn = document.getElementById('reset')
let startPage = document.getElementById('startPage')
let welcome = document.getElementById('Welcome')
let gameRules = document.getElementById('gameRules')
let exitBtn = document.getElementById("exit");
let topBar = document.getElementById("topBar");
let gameInstructions = document.getElementsByClassName("gameInstructions");

//===setting the canvas
//setting width & height of canvas inside main container
canvas.width = 1000;
canvas.height = 500;
 // telling the computer we're rendering context 2D images?
 const ctx = canvas.getContext('2d')

///=====GLOBAL VARIABLES NEEDED TO RESET GAME ====///
let countdown = 0
let artifactTally = 0
let collected = 0
let speed = 0

//characters/walls/images
let roomOneTop, roomOneLeft, hallOneRight, hallTwoTop,
    roomTwoTop, roomTwoLeftWall, roomThreeTop, roomThreeLavaOne,
    roomFourBottLava, roomFourRightLava, roomFiveLeftWall,
    roomFiveLavaLeft, FireBallOne, FireBallTwo, archChar;

let scroll, tablet, mummy, keyTreasure, treasure;

//empty array
let artifactArray = [];

//array for lava filling rooms
let lavaOne, lavaTwo, lavaThree, lavaFour
let lavaRoomOne,lavaRoomTwo, lavaRoomThree, lavaRoomFour
let lavaRoom = [
    { 
    visibility: false },
    {
    visibility: false},
    {
    visibility: false
    }, 
    {
    visibility: false},
]

//empty object for handling movement
let pressedKeys = {}


//====== PAGE CHANGE FUNCTIONS ======///
function startPageFunc() {
    //hide these elements
    topLeft.style.display = "none";
    canvas.style.display = "none";
    resetBtn.style.display = "none";
    topRight.style.display = "none";
    exitBtn.style.display = "none"

    //display only these
    startPage.style.display = "flex"
    welcome.innerText = "Welcome!"
    gameRules.innerText = "You have 2 minutes to collect all artifacts before the volcano explodes. Watch out for LAVA! Press Start to play.  "
}
startPageFunc()
// =====Start Button ===//

function startButtonFunc() {
    // console.log('I\'m being invoked')
    startPageFunc()
    reset()

 //===== Countdown to lava rooms =====//
    lavaRoomOne = setTimeout(setVisibility, 1000 *10 )
    function setVisibility () {
        lavaRoom[0].visibility= true
    }
    lavaRoomTwo = setTimeout( function () {
        lavaRoom[1].visibility= true
    }, 1000 *20 )

    lavaRoomThree = setTimeout (function () {
        lavaRoom[2].visibility= true
    }, 1000 *40)

    lavaRoomFour = setTimeout( function () {
        lavaRoom[3].visibility= true
        }, 1000 *60 )
    
}

function playPage() {
    //reset all game

    //display these elements
    topLeft.style.display = "block";
    topRight.style.display = "block";
    canvas.style.display = "block";
    exitBtn.style.display = "block"
    resetBtn.style.display = "block";

    //hide all elements in start page
    startPage.style.display = "none"
}
function losePageTimeout() {
    //display these & change innerText 
    startPage.style.display = "flex"
    welcome.innerText = "You lose!"
    gameRules.innerText = "The volcano exploded and you did not make it to safety. Press start to play again. "

    //hide these: 
    topLeft.style.display = "none";
    canvas.style.display = "none";
    resetBtn.style.display = "none";
    topRight.style.display = "none";
    exitBtn.style.display = "none"
}
function losePageDeathTrap() {

    //display these & change innerText 
    startPage.style.display = "flex"
    welcome.innerText = "You lose!"
    gameRules.innerText = "You fell into hot magma. Press Start to play again. "

    //hide these: 
    topLeft.style.display = "none";
    canvas.style.display = "none";
    resetBtn.style.display = "none";
    topRight.style.display = "none";
    exitBtn.style.display = "none"
}
function winPage() {
    reset()
    startPage.style.display = "flex"
    welcome.innerText = "You Win!"
    gameRules.innerText = "You made it to safety with all of the artifacts. Press start to play again. "

    //hide these: 
    topLeft.style.display = "none";
    canvas.style.display = "none";
    resetBtn.style.display = "none";
    topRight.style.display = "none";
    exitBtn.style.display = "none"
}
//======== Timers =========///

//Game timer - 2 minutes to complete level, check for win scenario
//=====countdown from 2 minutes
countdown = 120
let volacanoClockDown = setInterval(
    function timer() {

        if (countdown === 120) {
            volcanoTimer.innerText = `2:00`
        } else if (countdown < 120 && countdown >= 70) {
            volcanoTimer.innerText = ` 1:${countdown - 60}`
        } else if (countdown >= 60 && countdown < 70) {
            volcanoTimer.innerText = ` 1:0${countdown - 60}`
        } else if (countdown < 60 && countdown >= 10) {
            volcanoTimer.innerText = ` 0:${countdown}`
        } else if (countdown < 10 && countdown >= 0) {
            volcanoTimer.innerText = `0:0${countdown}`
        } else {
            clearInterval(volacanoClockDown)
            losePageTimeout()
        }
        countdown--
    }, 1000)

//===== RESET Game ====//
function reset() {
    //clear timer
    clearInterval(volacanoClockDown)
    //reset countdown clock
    countdown = 120
    volacanoClockDown = setInterval(
        function timer() {

            if (countdown === 120) {
                volcanoTimer.innerText = `2:00`
            } else if (countdown < 120 && countdown >= 70) {
                volcanoTimer.innerText = ` 1:${countdown - 60}`
            } else if (countdown >= 60 && countdown < 70) {
                volcanoTimer.innerText = ` 1:0${countdown - 60}`
            } else if (countdown < 60 && countdown >= 10) {
                volcanoTimer.innerText = ` 0:${countdown}`
            } else if (countdown < 10 && countdown >= 0) {
                volcanoTimer.innerText = `0:0${countdown}`
            } else {
                clearInterval(volacanoClockDown)
                losePageTimeout()
            }
            countdown--
        }, 1000)

    //invoking the playGame function
    playGame()
    //reset artifacts and innertext
    speed = 0
    collected = 0
    artifactTally = 0
    // pressedKeys = {}
    // playerMessage.innerText = "Welcome! Time to hunt for artifacts!"
    artifactCounter.innerText = `Artifact ( ${artifactTally} / 5 )`

    //resetting variables
    FireBallOne.x = 700
    FireBallOne.y = 20
    FireBallTwo.x = 800
    FireBallTwo.y = 200
    archChar.x = 980
    archChar.y = 470

    //resetting collected artifacts 
    for (let i = 0; artifactArray.length < i; i++) {
        artifactArray[i].collected = false
    }
    
    //resetting lava room 
    clearTimeout(lavaRoomOne)
    clearTimeout(lavaRoomTwo)
    clearTimeout(lavaRoomThree)
    clearTimeout(lavaRoomFour)
    for(let i = 0; lavaRoom.length < i; i++) {
        lavaRoom[i].visibility = false
    }
}


///======       GAME BEGINS         ====////

let animationRequest;
function playGame() {
    //hide the start screen/ call the play page
    playPage()




    //=====Drawing Class====//
    //creating the players/game pieces
    class Drawing {

        //if I wanted to count lives, I think I'd do it here
        constructor(x, y, width, height, color, radius) {
            this.x = x
            this.y = y
            this.width = width
            this.height = height
            this.color = color
            this.radius = radius
        }
        //when calling this class, we'll input the above variables, then render will draw it using Rect
        renderRect() {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }

        renderCircle() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.strokeStlye = "blue"
            ctx.stroke()
        }
    }


    //----Draw a Game room and contain all elements in an array, object or function?
    //Room 1
    roomOneTop = new Drawing(900, 310, 100, 30, "blue", 0);
    roomOneLeft = new Drawing(800, 400, 10, 100, "blue")
    hallOneRight = new Drawing(900, 340, 10, 90, "blue")
    hallTwoTop = new Drawing(830, 310, 80, 30, "blue")
    ///Room 2
    roomTwoTop = new Drawing(500, 310, 330, 30, "blue")
    roomTwoLeftWall = new Drawing(410, 350, 10, 180, "blue")
    //room 3
    roomThreeTop = new Drawing(150, 350, 260, 10, "blue")
    roomThreeLavaOne = new Drawing(0, 290, 70, 210, "red")
    //room 4
    roomFourBottLava = new Drawing(0, 100, 200, 190, "red")
    roomFourRightLava = new Drawing(260, 000, 70, 240, "red")
    //room 5
    roomFiveLeftWall = new Drawing(330, 0, 10, 200, "blue")
    roomFiveLavaLeft = new Drawing(340, 150, 200, 50, "red")

    //room 5 moving pieces
    FireBallOne = new Drawing(700, 20, 0, 0, "lime", 15)
    FireBallTwo = new Drawing(800, 280, 0, 0, "lime", 15)

    // ===== Draw Character====//
    //creates the "archaeologist character"
    archChar = new Drawing(980, 470, 20, 20, "orange", 20)

    //======Drawing Images ======///
    scroll = new Image();
    tablet = new Image();
    mummy = new Image();
    keyTreasure = new Image();
    treasure = new Image();
    let wall = new Image ();
    let lava = new Image ();
    let firetrap = new Image ();
    let IndianaJones = new Image ();
    artifactArray = [{
        img: scroll,
        x: 360,
        y: 450,
        height: 50,
        width: 50,
        collected: false
    },
    {
        img: tablet,
        x: 750,
        y: 450,
        height: 50,
        width: 50,
        collected: false
    },
    {
        img: mummy,
        x: 0,
        y: 0,
        height: 50,
        width: 50,
        collected: false
    },
    {
        img: treasure,
        x: 950,
        y: 250,
        height: 50,
        width: 50,
        collected: false
    },
    {
        img: keyTreasure,
        x: 340,
        y: 0,
        height: 50,
        width: 50,
        collected: false
    }]
    
    //create source link for each image
    function imageDraw() {
        scroll.src =
            "https://img.icons8.com/external-justicon-flat-justicon/512/external-papyrus-egypt-justicon-flat-justicon.png";
        tablet.src = "https://img.icons8.com/external-justicon-flat-justicon/512/external-cleopatra-egypt-justicon-flat-justicon.png"
        mummy.src = "https://img.icons8.com/external-flat-icons-maxicons/512/external-ancient-archeology-flat-flat-icons-maxicons-3.png"
        treasure.src = "https://img.icons8.com/external-flat-icons-maxicons/512/external-ancient-archeology-flat-flat-icons-maxicons-7.png"
        keyTreasure.src = "https://img.icons8.com/external-dreamcreateicons-outline-color-dreamcreateicons/512/external-anubis-museum-dreamcreateicons-outline-color-dreamcreateicons.png"
        lava.src = "https://img.freepik.com/free-vector/lava-seamless-textures-game-backgrounds-set_107791-12638.jpg?w=996&t=st=1670462085~exp=1670462685~hmac=2341b197a98512354f617f82ccfe68e804eac5a9e2189f095c986c4e4dddc2fe"
        // wall.src = "./img/Walls.png"
        // firetrap.src = "./img/Fire_Trap.png"
        IndianaJones.src = "./img/WalkLeft.png"
    
        window.requestAnimationFrame(draw);
    }

    //draw each image, if the artifact collected ==false

    function draw() {
        //draw only if this has not been collected
        artifactArray.forEach(checkToDraw);
        //calls the character to be drawn
        archChar.renderRect()

        //lava images draw over lava rectangles...no hit detection on JUST images
        // ctx.drawImage(firetrap, 0, 0, 448, 41, 340, 150, 200, 50);
        ctx.drawImage(wall, 4, 25, 12, 7, 400, 350, 200, 50);
        
        ctx.drawImage(IndianaJones, 3, 1, 60, 32, 800, 350, 100, 50);
        ctx.drawImage(lava, 0, 0, 160, 309, 340, 150, 200, 50);
        ctx.drawImage(lava, 0, 0, 160, 309, 0, 290, 70, 210);
        ctx.drawImage(lava, 0, 0, 160, 309, 0, 100, 200, 190);
        ctx.drawImage(lava, 0, 0, 160, 309, 260, 0, 80, 240);
        // console.log(lavaRoom[0])
        if (lavaRoom[0].visibility == true) {
            ctx.drawImage(lava, 0, 0, 160, 309, 820, 340, 200, 200);
        } 
        if (lavaRoom[1].visibility == true) {
                console.log(lavaRoom)
            ctx.drawImage(lava, 0, 0, 160, 309, 420, 340, 400, 200);
        }
        if (lavaRoom[2].visibility == true){
            ctx.drawImage(lava, 0, 0, 160, 309, 70, 340, 400, 200);
        }
        if (lavaRoom[3].visibility == true) {
            ctx.drawImage(lava, 0, 0, 160, 309, 0, 0, 200, 100);
        }

        function checkToDraw(artifact) {
            if (artifact.collected === false) {
                ctx.drawImage(artifact.img, artifact.x, artifact.y, artifact.width, artifact.height);
            }
        }

    }
    //=====list of all rendered walls in room ===//

    const wallsArray =
        [roomOneTop,
            roomOneLeft,
            hallOneRight,
            hallTwoTop,
            roomTwoTop,
            roomTwoLeftWall,
            roomThreeTop,
            roomFiveLeftWall]

    function drawRect(rectangle) {
        rectangle.renderRect();
    }

    //draws all objects in room each animation frame
    const drawRectangle = [
        roomOneTop,
        roomOneLeft,
        hallOneRight,
        hallTwoTop,
        roomTwoTop,
        roomTwoLeftWall,
        roomThreeTop,
        roomThreeLavaOne,
        roomFourBottLava,
        roomFourRightLava,
        roomFiveLeftWall,
        roomFiveLavaLeft
    ];
    //   console.log(drawRectangle)

    //draw the room set up
    function drawRoom(drawRectangle) {
        for (i = 0; i < drawRectangle.length; i++) {
            drawRect(drawRectangle[i]);
        }
    }

    drawRoom(drawRectangle)

    //=====Clearing Rectangles=====//
    //   function clearRectangle (rectangle) {
    //     ctx.clearRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    //   }
    //   clearRectangle(roomFiveLavaLeft)

    let speed = 5
    /// ==== Rectangle collision detection, return true ===== /////
    //call this function in the gameloop
    function detectHit(wall) {

        for (let i = 0; i < wall.length; i++) {
            let wallX = wall[i].x;
            let wally = wall[i].y;
            let wallWidth = wall[i].width;
            let wallHeight = wall[i].height;
            if (
                archChar.x < wallX + wallWidth &&
                archChar.x + archChar.width > wallX &&
                archChar.y < wally + wallHeight &&
                archChar.y + archChar.width > wally
            ) {
                return true;
            }
        }
    }

    //detects a single collision, returns true
    function detectHitTwo(artifact) {
        if (
            archChar.x < artifact.x + artifact.width &&
            archChar.x + archChar.width > artifact.x &&
            archChar.y < artifact.y + artifact.height &&
            archChar.y + archChar.width > artifact.y
        ) {
            return true;
        }
    }

    function detectHitThree(fireball) {
        if (
            archChar.x < fireball.x + fireball.width &&
            archChar.x + archChar.width > fireball.x &&
            archChar.y < fireball.y + fireball.radius&&
            archChar.y + archChar.width > fireball.y + fireball.radius
        ) {
            return true;
        }
    }
    //========Handling Movement Function ====///
//====== Handling movement ======///
//creating an empty object for pressedKeys so we can call them in the function below
pressedKeys = {}

//creating movement for archaeologist function
//needs e-event for knowing which key was pressed
function handleMovement(speed) {

    //move down
    if (pressedKeys.w) {
        archChar.y -= speed
    }
    //move up
    if (pressedKeys.s) {
        archChar.y += speed
    }
    //move left
    if (pressedKeys.a) {
        archChar.x -= speed
    }
    //move right
    if (pressedKeys.d) {
        archChar.x += speed
    }
    archChar.renderRect()

}

    //====check if we hit an artifact from artifact array, returns true===//
    function checkArtifactHit(artifactArray) {
        if (detectHit(artifactArray)) {
            //check each artifact
            artifactArray.forEach(checkArray);
            //take each object and see which one was hit
            function checkArray(artifactItem) {
                //checks for individual item hits
                if (detectHitTwo(artifactItem)) {
                    // playerMessage.innerText = "Press the Spacebar to pick up your artifact!"
                    return true
                }
            }
        }
    }
    function checkFireballHit(fireballArray) {
        if (detectHit(fireballArray)) {
            //check each fireball
            fireballArray.forEach(checkArray);
            //take each object and see which one was hit
            function checkArray(fireball) {
                //checks for individual item hits
                if (detectHitThree(fireball)) {
                    losePageDeathTrap ()
                }
            }
        }
    }

    //===== DEATH TRAP FUNCTIONS =====///

    //===FIREBALLS & Lava ===//
    //Array of death traps
    const deathTrapsArray = [
        roomThreeLavaOne,
        roomFourBottLava,
        roomFourRightLava,
        roomFiveLeftWall,
        roomFiveLavaLeft,
        FireBallOne,
        FireBallTwo,
    ]
    let xFireball = 700;
    let yFireball = 20;
    let yDirection = 5
    let radiusFireball = 15;

    function movingFireball() {
        const FireBallOne = new Drawing(xFireball, yFireball, 0, 0, "lime", radiusFireball);
        FireBallOne.renderCircle();

        // xTwo = xTwo + 5;
        yFireball = yFireball + yDirection;

        //310 is wall where fireball hits, must change to better variable
        //this says, if the middle of the fireball hits the wall minus the radius of the fireball, change direction
        if (yFireball > (310 - radiusFireball)) {
            yDirection = -1 * yDirection

            //if the fireball gets so close to the 0 y-axis that its radius hits it, change direction again
        } else if (yFireball < radiusFireball) {
            yDirection = -1 * yDirection
        }
    }

    //sends directly to lose page if hitting a death trap
    function trapDetectHit(deathTrapsArray) {
        if (detectHit(deathTrapsArray)) {
            losePageDeathTrap()

        }
    }

    //blocks player from moving outside of the canvas 
    function stayOnPage() {
        if (archChar.x + archChar.width >= canvas.width) {
            handleMovement(-5)
        } else if (archChar.y + archChar.height >= canvas.height) {
            handleMovement(-5)
        } else if (archChar.x < 0) {
            handleMovement(-5)
        } else if (archChar.y < 0) {
            handleMovement(-5)
        }
    }

    //===== MAIN LOOP FUNCTION FOR GAME RIGHT NOW ===//

    function animate() {
        //clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //let player move
        handleMovement(5)
        //make sure character doesn't go off-screen
        stayOnPage()
        //redraw room
        drawRoom(drawRectangle)
        //check if we hit a wall
        if (detectHit(wallsArray)) {
            handleMovement(-5)
        }

        // check if we hit a death trap, if so, game over
        trapDetectHit(deathTrapsArray)
        //check if we hit an artifact
        checkArtifactHit(artifactArray)
        //make the fireball move
        movingFireball()
        checkFireballHit(FireBallOne)
        animationRequest = requestAnimationFrame(animate);
        //draw images
        imageDraw();
    }
    cancelAnimationFrame(animationRequest)
    animate();



    //===== Event Listeners for key press ======//
    //if a key is pressed, pressedKeys *empty object* updates e *with the key pressed *.  e.key
    //e is event, key is the property
    document.addEventListener('keydown', e => pressedKeys[e.key] = true)
    //if key is up = false
    document.addEventListener('keyup', e => pressedKeys[e.key] = false)

    ///=====pick up artifact/make renders disappear=====//
///=====pick up artifact/make renders disappear=====//
//need to set detection function for artifacts first
document.addEventListener("keyup", 
    function pickUpArtifact (e) {
        if(e.code == "Space" || e.key == " ") {
            // console.log('spacebar')
            //call hit detection for specific coordinates
            //if those coordinates are true
            if(detectHit (artifactArray)) {
                //updated collected to true
                artifactArray.forEach (checkArray);
                //take each object and see which one was hit
                function checkArray(artifactItem) {

                    //checks for individual item hits
                    if(detectHitTwo(artifactItem)) {
                        if(artifactItem.collected === false) {
                        artifactItem.collected = true
                        //add an artifact tally
                        artifactTally ++
                        console.log(artifactItem)
                    } 
                   }
                   if(artifactTally === 5) {
                    winPage ()
                   }
            }
            artifactCounter.innerText = `Artifact ( ${artifactTally} / 5 )`

            // playerMessage.innerText = "You found an artifact!"
        }
        }
})

    ///====Check for Win Scenario, returns true if achieved ===//
    // function checkForWin () {
    //     artifactArray.forEach(function checkCollected (artifact) {
    //         if (artifact.collected === true) {
    //             collected ++
    //         }
    //     })
    //     if(collected === 5) {
    //         winPage ()
    //     }
    //     }


}///playGame End


//===== BUTTONS =====///

startBtn.addEventListener("click", startButtonFunc)
resetBtn.addEventListener('click', reset)
//==== Exit Button ====//
exitBtn.addEventListener('click',
    function exitGame() {
        reset()
        startPageFunc()
    })