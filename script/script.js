//Vars for updating innerText
let volcanoTimer = document.getElementById('volcano-timer')
    let artifactCounter = document.getElementById('artifacts-counter')
    let playerMessage = document.getElementById('player-message')

//Vars for hiding start/game/reset elements
let topLeft = document.getElementById('top-left')
    let topRight= document.getElementById('top-right')
    let leftBumper= document.getElementById('left-bumper')
    let rightBumper= document.getElementById('right-bumper')
    let canvas= document.querySelector('canvas')
    let main = document.querySelector('main')
    let bottom = document.getElementById('bottom')
    let startBtn = document.getElementById('start')
    let resetBtn = document.getElementById('reset')
    let startPage = document.getElementById('startPage')
    let welcome = document.getElementById('Welcome')
    let gameRules = document.getElementById('gameRules')
    let exitBtn = document.getElementById("exit");
    let topBar = document.getElementById("topBar");
    let gameInstructions = document.getElementById("gameInstructions");

///=====GLOBAL VARIABLES NEEDED TO RESET GAME ====///
let countdown = 0
let artifactTally = 0

//characters/walls/images
let roomOneTop, roomOneLeft, hallOneRight, hallTwoTop, 
roomTwoTop, roomTwoLeftWall, roomThreeTop, roomThreeLavaOne, 
roomFourBottLava, roomFourRightLava, roomFiveLeftWall, 
roomFiveLavaLeft, FireBallOne, FireBallTwo, archChar;

let scroll,tablet,mummy,keyTreasure,treasure;

//empty array
let artifactArray = [];


//====== PAGE CHANGE FUNCTIONS ======///
function startPageFunc () {
    //hide these elements
    topLeft.style.display = "none";
    canvas.style.display = "none";
    resetBtn.style.display = "none";
    topRight.style.display = "none";
    exitBtn.style.display = "none"

    //display only these
    startPage.style.display = "flex"
    welcome.innerText = "Welcome!"
    gameRules.innerText = "You have 2 minutes to collect all artifacts before the volcano explodes. Press Start to play.  "
}
startPageFunc ()

function playPage () {
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
function losePageTimeout () {
    //display these & change innerText 
    startPage.style.display = "block"
    welcome.innerText = "You lose!"
    gameRules.innerText = "The volcano exploded and you did not make it to safety. Press start to play again. "

    //hide these: 
    gameInstructions.style.display = "none"
    topLeft.style.display = "none";
    canvas.style.display = "none";
    resetBtn.style.display = "none";
    topRight.style.display = "none";
    exitBtn.style.display = "none"   
}
function losePageDeathTrap () {
    
    //display these & change innerText 
    startPage.style.display = "flex"
    welcome.innerText = "You lose!"
    gameRules.innerText = "You fell into hot magma. Press Start to play again. "

    //hide these: 
    gameInstructions.style.display = "none"
    topLeft.style.display = "none";
    canvas.style.display = "none";
    resetBtn.style.display = "none";
    topRight.style.display = "none";
    exitBtn.style.display = "none"   
}
function winPage () {
    
    startPage.style.display = "block"
    welcome.innerText = "You Win!"
    gameRules.style.innerText = "You made it to safety with all of the artifacts. Press start to play again. "

    //hide these: 
    gameInstructions.style.display = "none"
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
let volacanoClockDown = setInterval (
    function timer () {
        // console.log('countdown ', countdown)
        // console.log(archChar.x, archChar.y)
        if (countdown === 120) {
            volcanoTimer.innerText = `2:00`
        } else if (countdown < 120 && countdown>= 70) {
            volcanoTimer.innerText = ` 1:${countdown - 60}`
        } else if (countdown >= 60 && countdown < 70) {
            volcanoTimer.innerText = ` 1:0${countdown - 60}`
        } else if (countdown < 60 && countdown >= 10) {
            volcanoTimer.innerText = ` 0:${countdown}`
        } else if (countdown< 10 && countdown>= 0){
                volcanoTimer.innerText = `0:0${countdown}`
        } else {
            clearInterval(volacanoClockDown)
            losePageTimeout ()
        }
        countdown--
    }, 1000)

//===== RESET Game ====//
function reset () {
    //clear timer
    clearInterval(volacanoClockDown)
    //reset countdown clock
    countdown = 120
    volacanoClockDown = setInterval (
    function timer () {
        // console.log('countdown ', countdown)
        // console.log(archChar.x, archChar.y)
        if (countdown === 120) {
            volcanoTimer.innerText = `2:00`
        } else if (countdown < 120 && countdown>= 70) {
            volcanoTimer.innerText = ` 1:${countdown - 60}`
        } else if (countdown >= 60 && countdown < 70) {
            volcanoTimer.innerText = ` 1:0${countdown - 60}`
        } else if (countdown < 60 && countdown >= 10) {
            volcanoTimer.innerText = ` 0:${countdown}`
        } else if (countdown< 10 && countdown>= 0){
                volcanoTimer.innerText = `0:0${countdown}`
        } else {
            clearInterval(volacanoClockDown)
            losePageTimeout ()
        }
        countdown--
    }, 1000)

    //invoking the playGame function
    playGame()
    //reset artifacts and innertext
    artifactTally = 0
    playerMessage.innerText = "Welcome! Time to hunt for artifacts!"
    artifactCounter.innerText = `Artifact ( ${artifactTally} / 5 )`

    //resetting variables
    FireBallOne.x = 700
    FireBallOne.y = 20
    FireBallTwo.x = 800
    FireBallTwo.y =200
    archChar.x = 980
    archChar.y = 470

    //resetting collected artifacts 
    for(let i = 0; artifactArray.length < i; i++) {
        artifactArray[i].collected = false
        }
    }

// =====Start Button ===//
function startButtonFunc () {
    console.log('I\'m being invoked')
    startPageFunc ()
    reset ()
    // playGame ()
}

//===setting the canvas
//setting width & height inside main container
canvas.width = 1000;
canvas.height = 500;


///======       GAME BEGINS         ====////


function playGame () {
    //hide the start screen/ call the play page
    playPage ()
    
// telling the computer we're rendering context 2D images?
const ctx = canvas.getContext('2d')



//=====Drawing Class====//
//creating the players/game pieces
class Drawing {

    //if I wanted to count lives, I think I'd do it here
    constructor (x, y, width, height, color, radius) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.radius = radius
    }
    //when calling this class, we'll input the above variables, then render will draw it using Rect
    renderRect () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    } 
    
    renderCircle () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStlye = "blue"
        ctx.stroke()
    }
}


//----Draw a Game room and contain all elements in an array, object or function?
//Room 1
roomOneTop = new Drawing(900, 330, 100, 10, "blue", 0);
roomOneLeft = new Drawing(800, 400, 10, 100, "blue")
hallOneRight = new Drawing(900, 340, 10, 90, "blue")
hallTwoTop = new Drawing (830, 330, 80, 10, "blue")
///Room 2
 roomTwoTop = new Drawing(500, 310, 330, 30, "blue")
roomTwoLeftWall = new Drawing (410, 350, 10, 180, "blue")
//room 3
roomThreeTop = new Drawing (150, 350, 260, 10, "blue")
roomThreeLavaOne = new Drawing(0, 290, 70, 210, "red")
//room 4
roomFourBottLava = new Drawing(0, 100, 200, 190, "red")
roomFourRightLava = new Drawing(260, 000, 50, 240, "red")
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
mummy = new Image ();
keyTreasure = new Image ();
treasure = new Image ();


//create source link for each image
function imageDraw() {
    scroll.src =
    "https://img.freepik.com/free-vector/ancient-egypt-religion-culture-history-papyrus-with-main-gods-images-scarab-beetle-amulet-museum-exhibit-illustration_1284-64978.jpg?w=1380&t=st=1670207915~exp=1670208515~hmac=9ab1772ecda74a242f99dfd6d445dab74256906e3edca618f8776e6767a53f6b";
    tablet.src = "https://img.freepik.com/free-vector/egypt-flat-colorful-illustration_1284-19714.jpg?w=826&t=st=1670281279~exp=1670281879~hmac=a4b93334411677ee93af06ff5bc8e8629053194dbfde6f8db9ed0d6bd9db62ad"
    mummy.src = "https://img.freepik.com/free-vector/mummy-creation-cartoon-vector-illustration-stages-mummification-process-embalming-dead-body-wrapping-it-with-cloth-placing-egyptian-sarcophagus-traditions-ancient-egypt-cult-dead_107791-4230.jpg?w=740&t=st=1670281561~exp=1670282161~hmac=493907bfc8d8cc794c31165358798bee80895732c2891784c5ede18cbeaf037e"
    treasure.src = "https://img.freepik.com/free-vector/egyptian-composition-with-characters-ancient-god-creatures-box-full-valuable-items-vector-illustration_1284-66068.jpg?w=826&t=st=1670281964~exp=1670282564~hmac=ff184c6711a948bae3deb9f1332bebf939bc45a166bf6587c83b38b89a495af2"
    keyTreasure.src = "https://cdn-icons-png.flaticon.com/512/1048/1048522.png?w=826&t=st=1670282468~exp=1670283068~hmac=f76942f36d771c8ec7ecb6b29608abf8d917ab10c097fc2a619f00ba0dc98f7e"
    artifactArray = [ {
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
    }   ]
    window.requestAnimationFrame(draw);
}

//draw each image, if the artifact collected ==false

function draw() {
    //draw only if this has not been collected
    artifactArray.forEach(checkToDraw);
    //calls the character to be drawn
    archChar.renderRect()
    function checkToDraw (artifact) {
        if (artifact.collected === false) {
            ctx.drawImage(artifact.img, artifact.x, artifact.y, artifact.width, artifact.height);
            // ctx.drawImage(tablet, 750, 450, 50, 50)
            // ctx.drawImage(mummy, 0, 0, 50, 50)
            // ctx.drawImage(treasure, 950, 250, 50, 50)
            // ctx.drawImage(keyTreasure, 340, 0, 50, 50)
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
function drawRoom (drawRectangle) {
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
    // console.log("detect hit fired");
    // console.log(wall.length)
    for (let i = 0; i < wall.length; i++) {
      let wallX = wall[i].x;
      let wally = wall[i].y;
      let wallWidth = wall[i].width;
      let wallHeight = wall[i].height;
      // console.log(wallX, wally, wallWidth, wallHeight)
      if (
        archChar.x < wallX + wallWidth &&
        archChar.x + archChar.width > wallX &&
        archChar.y < wally + wallHeight &&
        archChar.y + archChar.width > wally
      ) {
        // console.log("collision");
        return true;
      }
    }
  }
// detectHit(drawRectangle)

//detects a single collision, returns true
function detectHitTwo(artifact) {
      if (
        archChar.x < artifact.x + artifact.width  &&
        archChar.x + archChar.width > artifact.x  &&
        archChar.y < artifact.y + artifact.height  &&
        archChar.y + archChar.width > artifact.y
      ) {
        // console.log("collision");
        return true;
      }
    }
  

//====== Handling movement ======///
//creating an empty object for pressedKeys so we can call them in the function below
const pressedKeys = {}
// console.log(pressedKeys)
//creating movement for archaeologist function
    //needs e-event for knowing which key was pressed
function handleMovement (speed) {
    // console.log('handle movement', )
    // console.log(archChar)
    //move down
    if (pressedKeys.w) {
        archChar.y -= speed
    }
    //move up
    if (pressedKeys.s) {
        archChar.y+= speed
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
    // detectHit(drawRectangle)
    
}

//====check if we hit an artifact from artifact array, returns true===//
function checkArtifactHit (artifactArray) {
    if(detectHit(artifactArray)){
        //check each artifact
        artifactArray.forEach (checkArray);
        //take each object and see which one was hit
        function checkArray(artifactItem) {
            //checks for individual item hits
           if(detectHitTwo(artifactItem)) {
            playerMessage.innerHTML = "Press the <strong>Spacebar</strong> to pick up your artifact!"
            //send back the item that was hit
           return true
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
console.log(deathTrapsArray)
let xFireball = 700;
let yFireball = 20;
let yDirection = 5
let radiusFireball = 15; 

function movingFireball () {
    const FireBallOne = new Drawing(xFireball, yFireball, 0, 0, "lime", radiusFireball);
    FireBallOne.renderCircle();

    // xTwo = xTwo + 5;
    yFireball = yFireball + yDirection;

    //310 is wall where fireball hits, must change to better variable
    //this says, if the middle of the fireball hits the wall minus the radius of the fireball, change direction
    if(yFireball > (310 - radiusFireball)) {
        yDirection = -1 * yDirection 

    //if the fireball gets so close to the 0 y-axis that its radius hits it, change direction again
    } else if (yFireball < radiusFireball) {
        yDirection = -1 *yDirection
    }
}

//sends directly to lose page if hitting a death trap
function trapDetectHit (deathTrapsArray) {
    if(detectHit(deathTrapsArray)){
        // console.log("deathtrap array ", deathTrapsArray)
        losePageDeathTrap ()
        
    }
}

//blocks player from moving outside of the canvas 
function stayOnPage () {
    if(archChar.x + archChar.width >= canvas.width) {
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

function animate () {
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //let player move
    handleMovement(5)
    //make sure character doesn't go off-screen
    stayOnPage ()
    //redraw room
    drawRoom(drawRectangle)
    //check if we hit a wall
    if(detectHit(wallsArray)) {
        handleMovement(-5)
    }
    // if(detectHit(artifactArray)) {
    //     handleMovement(-5)
    // }
    // check if we hit a death trap, if so, game over
    trapDetectHit (deathTrapsArray)
    //check if we hit an artifact
    checkArtifactHit (artifactArray)
    //make the fireball move
    movingFireball ()

    requestAnimationFrame(animate);
    //draw images
    imageDraw();
}
animate();



//===== Event Listeners for key press ======//
//if a key is pressed, pressedKeys *empty object* updates e *with the key pressed *.  e.key
//e is event, key is the property
document.addEventListener('keydown', e => pressedKeys[e.key] = true)
//if key is up = false
document.addEventListener('keyup', e => pressedKeys[e.key] = false)

///=====pick up artifact/make renders disappear=====//
//need to set detection function for artifacts first
//if statement will say if spacebar && detect an artifact/rectangleABCD or E, clear rectangle based on character position
document.addEventListener("keyup", 
    function pickUpArtifact (e) {
        if(e.code == "Space" || e.key == " ") {
            console.log('spacebar')
            //call hit detection for specific coordinates
            //if those coordinates are true
            if(detectHit (artifactArray)) {
                
                // console.log('we have a hit')
                //updated collected to true
                artifactArray.forEach (checkArray);
                //take each object and see which one was hit
                function checkArray(artifactItem) {
                    // console.log(artifactItem)

                    //add a buffer area where 
                    
                    //checks for individual item hits
                    if(detectHitTwo(artifactItem)) {
                        artifactItem.collected = true
                        //add an artifact tally
                        artifactTally ++
                   }
            }
            artifactCounter.innerText = `Artifact ( ${artifactTally} / 5 )`

            playerMessage.innerText = "You found an artifact!"
            checkForWin ()
        }
        }
})


//=====set timeout for reminding players of volcano
//can set timer within timeout to make text change sizes when there's 10 seconds left

let collected= 0
///====Check for Win Scenario, returns true if achieved ===//
function checkForWin () {
    artifactArray.forEach(function checkCollected (artifact) {
        if (artifact.collected === true) {
            collected ++
        }
    })
    if(collected === 5) {
        winPage ()
    }
    }


}///playGame End

//===== BUTTONS =====///

startBtn.addEventListener("click", startButtonFunc)
resetBtn.addEventListener('click', reset)
    //==== Exit Button ====//
exitBtn.addEventListener ('click', 
    function exitGame () {
        reset()
        startPageFunc()
    })