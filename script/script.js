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
    //hide the start screen/ call teh play page
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
    scroll, tablet, mummy, keyTreasure, treasure
];

function init() {
    scroll.src =
    "https://img.freepik.com/free-vector/ancient-egypt-religion-culture-history-papyrus-with-main-gods-images-scarab-beetle-amulet-museum-exhibit-illustration_1284-64978.jpg?w=1380&t=st=1670207915~exp=1670208515~hmac=9ab1772ecda74a242f99dfd6d445dab74256906e3edca618f8776e6767a53f6b";
    tablet.src = "https://img.freepik.com/free-vector/egypt-flat-colorful-illustration_1284-19714.jpg?w=826&t=st=1670281279~exp=1670281879~hmac=a4b93334411677ee93af06ff5bc8e8629053194dbfde6f8db9ed0d6bd9db62ad"
    mummy.src = "https://img.freepik.com/free-vector/mummy-creation-cartoon-vector-illustration-stages-mummification-process-embalming-dead-body-wrapping-it-with-cloth-placing-egyptian-sarcophagus-traditions-ancient-egypt-cult-dead_107791-4230.jpg?w=740&t=st=1670281561~exp=1670282161~hmac=493907bfc8d8cc794c31165358798bee80895732c2891784c5ede18cbeaf037e"
    treasure.src = "https://img.freepik.com/free-vector/egyptian-composition-with-characters-ancient-god-creatures-box-full-valuable-items-vector-illustration_1284-66068.jpg?w=826&t=st=1670281964~exp=1670282564~hmac=ff184c6711a948bae3deb9f1332bebf939bc45a166bf6587c83b38b89a495af2"
    keyTreasure.src = "https://cdn-icons-png.flaticon.com/512/1048/1048522.png?w=826&t=st=1670282468~exp=1670283068~hmac=f76942f36d771c8ec7ecb6b29608abf8d917ab10c097fc2a619f00ba0dc98f7e"
    window.requestAnimationFrame(draw);
}

function draw() {
    ctx.drawImage(scroll, 360, 450, 50, 50);
    ctx.drawImage(tablet, 750, 450, 50, 50)
    ctx.drawImage(mummy, 0, 0, 50, 50)
    ctx.drawImage(treasure, 950, 250, 50, 50)
    ctx.drawImage(keyTreasure, 340, 0, 50, 50)
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
  function clearRectangle (rectangle) {
    ctx.clearRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  }
//   clearRectangle(roomFiveLavaLeft)


///-===hit detection

//get distance using pythagorean theorum, good for circles
// function getCircleDistance(archCharx, archChary, wallx, wally) {
//     let xDistance = wallx - archCharx;
//     let yDistance = wally - archChary;
//     let tDistance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
//     console.log(tDistance, ' get distance')
//     return tDistance
// }

let speed = 5
/// ==== Rectangle collision detection ===== /////
//call this function in the gameloop
function detectHit(wall) {
    console.log("detect hit fired");
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
        console.log("collision");
        return true;
      }
    }
  }
// detectHit(drawRectangle)


///=====pick up artifact/make renders disappear=====//
//need to set detection function for artifacts first
//if statement will say if spacebar && detect an artifact/rectangleABCD or E, clear rectangle based on character position
let artifactTally = 0
addEventListener("keyup", 
    function pickUpArtifact (e) {
        if(e.key == "Space" || e.key == " ") {
            //call hit detection for specific coordinates

            //if those coordinates are true
            if(true) {
                //clear the rectangle corresponding to those coordinates
                ctx.clearRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);

                //add an artifact tally
                artifactTally ++
            }
            artifactCounter.innerText = `Artifact (${artifactTally} /)`
            checkForWin ()
        }
})


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
    detectHit(drawRectangle)
    // if ( detectHit(drawRectangle) == false) {
    //     speed = -1
    // }
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

let xFireball = 700;
let yFireball = 20;
let yDirection = 5
let radiusFireball = 15; 
function animate () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const FireBallOne = new Drawing(xFireball, yFireball, 0, 0, "lime", radiusFireball);
    FireBallOne.renderCircle();

    // xTwo = xTwo + 5;
    yFireball = yFireball + yDirection;
    handleMovement(5)
    drawRoom(drawRectangle)
    if(detectHit(drawRectangle)) {
        handleMovement(-5)
    }
    if(yFireball > (310 - radiusFireball)) {
        yDirection = -1 * yDirection 
    } else if (yFireball < radiusFireball) {
        yDirection = -1 *yDirection
    }

    requestAnimationFrame(animate);
    init();
}
animate();




//===== Event Listeners for key press ======//
//if a key is pressed, pressedKeys *empty object* updates e *with the key pressed *.  e.key
//e is event, key is the property
document.addEventListener('keydown', e => pressedKeys[e.key] = true)
//if key is up = false
document.addEventListener('keyup', e => pressedKeys[e.key] = false)

//handle movement can access the pressedKeys e.key anytime because it is a global object


//======== Timers =========///
//game will loop every 60 miliseconds until we clear the interval (later)
//with no clearRect, we get a snake movement with a trail of where object has been
//invoke handleMovement to make sure we can use the function repeatedly
// setInterval( 
//     function gameLoop () {
//         ctx.clearRect(0,0, canvas.width, canvas.height)
//         handleMovement(5)
//         archChar.renderRect()
        
//     }, 60)

//Game timer - 2 minutes to complete level, check for win scenario
setInterval (
    function timer () {

        
    }, 120000) //2 minutes 2 * 60 *1000

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


///====Check for Win Scenario ===//
function checkForWin () {
    if (artifactTally === 5) {

    }
}
}) //playGame function on startBtn event listener


//===== RESET BUTTON ====//
resetBtn.addEventListener('click', 
    function reset () {
        playPage() 
        ///probably need timers to restart and character to redraw at beginning
    })

    //==== Exit Button ====//
exitBtn.addEventListener ('click', 
    function exitGame () {
        startPageFunc()
    })