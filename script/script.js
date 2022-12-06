//Vars for updating innerText
let volcanoTimer = document.querySelector('#volcano-timer')
    let artifactCounter = document.querySelector('#artifacts-counter')
    let playerMessage = document.querySelector('#player-message')

//Vars for hiding start/game/reset elements
let topLeft = document.getElementById('top-left')
    let topRight= document.querySelector('#top-right')
    let leftBumper= document.querySelector('#left-bumper')
    let rightBumper= document.querySelector('#right-bumper')
    let canvas= document.querySelector('canvas')
    let main = document.querySelector('main')
    let bottom = document.querySelector('#bottom')
    let startBtn = document.querySelector('#start')
    let resetBtn = document.querySelector('#reset')
    let startPage = document.querySelector('#startPage')
    let welcome = document.querySelector('#Welcome')
    let gameRules = document.querySelector('#gameRules')
    let exitBtn = document.querySelector("#exit");
    let topBar = document.getElementById("topBar");
    let gameInstructions = document.querySelector("#gameInstructions");

///==== Functions for hiding and revealing HTML Elements ===///


function startPageFunc () {
    //hide these elements
    topLeft.style.display = "none";
    canvas.style.display = "none";
    resetBtn.style.display = "none";
    topRight.style.display = "none";
    exitBtn.style.display = "none"

    //display only these
    startPage.style.display = "block"
}
startPageFunc ()

function playPage () {
    //display these elements
    topLeft.style.display = "block";
    topRight.style.display = "block";
    canvas.style.display = "block";
    exitBtn.style.display = "block"
    resetBtn.style.display = "block";

    //hide all elements in start page
    startPage.style.display = "none"
}

function losePage () {
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

//===setting the canvas
//setting width & height inside main container
canvas.width = 1000;
canvas.height = 500;


///======The start button is clicked. Game begins ====////

startBtn.addEventListener("click", 
function playGame () {
    //hide the start screen/ call the play page
    playPage ()

// telling the computer we're rendering context 2D images?
const ctx = canvas.getContext('2d')
console.log(ctx)


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


// ===== Draw Character====//
//creates the "archaeologist character"
const archChar = new Drawing(980, 470, 20, 20, "orange", 20)
//calls the character to be drawn
archChar.renderRect()


//----Draw a Game room and contain all elements in an array, object or function?
//Room 1
const roomOneTop = new Drawing(900, 330, 100, 10, "blue", 0);
const roomOneLeft = new Drawing(800, 400, 10, 100, "blue")
const hallOneRight = new Drawing(900, 340, 10, 90, "blue")
const hallTwoTop = new Drawing (830, 330, 80, 10, "blue")
///Room 2
const roomTwoTop = new Drawing(500, 310, 330, 30, "blue")
const roomTwoLeftWall = new Drawing (410, 350, 10, 180, "blue")
//room 3
const roomThreeTop = new Drawing (150, 350, 260, 10, "blue")
const roomThreeLavaOne = new Drawing(0, 290, 70, 210, "red")
//room 4
const roomFourBottLava = new Drawing(0, 100, 200, 190, "red")
const roomFourRightLava = new Drawing(260, 000, 50, 240, "red")
//room 5
const roomFiveLeftWall = new Drawing(330, 0, 10, 200, "blue")
const roomFiveLavaLeft = new Drawing(340, 150, 200, 50, "red")

//room 5 moving pieces
const FireBallOne = new Drawing(700, 20, 0, 0, "lime", 15)
const FireBallTwo = new Drawing(800, 280, 0, 0, "lime", 15)

//======Drawing Images ======///
const scroll = new Image();
const tablet = new Image();
const mummy = new Image ();
const keyTreasure = new Image ();
const treasure = new Image ();
const artifactArray = [
     {
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
    }   
];

//create source link for each image
function init() {
    scroll.src =
    "https://img.freepik.com/free-vector/ancient-egypt-religion-culture-history-papyrus-with-main-gods-images-scarab-beetle-amulet-museum-exhibit-illustration_1284-64978.jpg?w=1380&t=st=1670207915~exp=1670208515~hmac=9ab1772ecda74a242f99dfd6d445dab74256906e3edca618f8776e6767a53f6b";
    tablet.src = "https://img.freepik.com/free-vector/egypt-flat-colorful-illustration_1284-19714.jpg?w=826&t=st=1670281279~exp=1670281879~hmac=a4b93334411677ee93af06ff5bc8e8629053194dbfde6f8db9ed0d6bd9db62ad"
    mummy.src = "https://img.freepik.com/free-vector/mummy-creation-cartoon-vector-illustration-stages-mummification-process-embalming-dead-body-wrapping-it-with-cloth-placing-egyptian-sarcophagus-traditions-ancient-egypt-cult-dead_107791-4230.jpg?w=740&t=st=1670281561~exp=1670282161~hmac=493907bfc8d8cc794c31165358798bee80895732c2891784c5ede18cbeaf037e"
    treasure.src = "https://img.freepik.com/free-vector/egyptian-composition-with-characters-ancient-god-creatures-box-full-valuable-items-vector-illustration_1284-66068.jpg?w=826&t=st=1670281964~exp=1670282564~hmac=ff184c6711a948bae3deb9f1332bebf939bc45a166bf6587c83b38b89a495af2"
    keyTreasure.src = "https://cdn-icons-png.flaticon.com/512/1048/1048522.png?w=826&t=st=1670282468~exp=1670283068~hmac=f76942f36d771c8ec7ecb6b29608abf8d917ab10c097fc2a619f00ba0dc98f7e"
    window.requestAnimationFrame(draw);
}

//draw each image, if the artifact collected ==false

function draw() {
    //draw only if this has not been collected
    artifactArray.forEach(checkToDraw);
    
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

//=====list of all rendered objects in room ===//

function drawRect(rectangle) {
    rectangle.renderRect();
  }
  
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
  console.log(drawRectangle)
  
  //draw the room set up
function drawRoom (drawRectangle) {
        for (i = 0; i < drawRectangle.length; i++) {
            drawRect(drawRectangle[i]);
        } 
    }

drawRoom(drawRectangle)
    
    // console.log(drawRoom)
    // console.log(drawRectangle)
//   console.log(roomFiveLavaLeft.x, roomFiveLavaLeft.y, roomFiveLavaLeft.width, roomFiveLavaLeft.height);



  //=====Clearing Rectangles=====//
//   function clearRectangle (rectangle) {
//     ctx.clearRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
//   }
//   clearRectangle(roomFiveLavaLeft)

let speed = 5
/// ==== Rectangle collision detection ===== /////
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
        archChar.x < artifact.x + artifact.width + 3 &&
        archChar.x + archChar.width > artifact.x + 3 &&
        archChar.y < artifact.y + artifact.height + 3&&
        archChar.y + archChar.width > artifact.y + 3
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

//===FIREBALLS===//
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

 //===== MAIN LOOP FUNCTION FOR GAME RIGHT NOW ===//

function animate () {
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //let player move
    handleMovement(5)
    //redraw room
    drawRoom(drawRectangle)
    //check if we hit a wall
    if(detectHit(drawRectangle)) {
        handleMovement(-5)
    }
    //check if we hit an artifact
    checkArtifactHit (artifactArray)
    //make the fireball move
    movingFireball ()


    requestAnimationFrame(animate);
    //draw images
    init();
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
let artifactTally = 0
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


//======== Timers =========///

//Game timer - 2 minutes to complete level, check for win scenario
    //=====countdown from 2 minutes
    let countdown = 120
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
                losePage ()
            }
            countdown--
        }, 500)

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
        return true
    }
    }



}) //playGame function on startBtn event listener
//===== RESET BUTTON ====//
function reset () {
    playPage() 
    countdown = 120
    artifactTally = 0
    playerMessage.innerText = "Welcome! Time to hunt for artifacts!"
    artifactCounter.innerText = `Artifact ( ${artifactTally} / 5 )`
    archChar = new Drawing(980, 470, 20, 20, "orange", 20)
    //calls the character to be drawn
    archChar.renderRect()
        ///probably need timers to restart and character to redraw at beginning
    }


resetBtn.addEventListener('click', reset)
    //==== Exit Button ====//
exitBtn.addEventListener ('click', 
    function exitGame () {
        // reset()
        startPageFunc()
    })