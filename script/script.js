//Vars for updating innerText
let volcanoTimer = document.querySelector('#volcano-timer')
let artifactCounter = document.querySelector('#artifacts-counter')
let playerMessage = document.querySelector('#player-message')

//Vars for hiding start/game/reset elements
let topLeft = document.querySelector('#top-left')
let topRight= document.querySelector('#top-right')
let leftBumper= document.querySelector('#left-bumper')
let rightBumper= document.querySelector('#right-bumper')
let canvas= document.querySelector('canvas')
let main = document.querySelector('main')
// console.log(canvas)
let bottom = document.querySelector('#bottom')
// console.log(bottom)
let startBtn = document.querySelector('#start')
let resetBtn = document.querySelector('#reset')

//===setting the canvas
//setting width & height inside main container
// canvas.width = main.width
// canvas.height = main.height

//determines the height and width of the canvas/main div 
// currently, because of the box grid, set to 285Height 120width
// let mainHeight= main.clientHeight
// let mainWidth = main.clientWidth
// canvas.setAttribute('height', getComputedStyle(canvas)['height'])
// canvas.setAttribute('width', getComputedStyle(canvas)['width'])
// console.log (mainHeight, " ", mainWidth)
canvas.width = 1000;
canvas.height = 500;


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

const artifactDraw = new Drawing(100, 100, 0, 0, "lime", 30)
artifactDraw.renderCircle()
// ===== Draw Character====//
//creates the "archaeologist character"
const archChar = new Drawing(980, 470, 20, 20, "orange", 20)
//calls the character to be drawn
archChar.renderRect()


//----Draw a Game room and contain all elements in an array, object or function?
//drawing walls
const roomOneTop = new Drawing(900, 330, 100, 10, "blue", 0);
// roomOneTop.renderRect();

const roomOneLeft = new Drawing(800, 400, 10, 100, "blue")
// roomOneLeft.renderRect()


const hallOneRight = new Drawing(900, 340, 10, 90, "blue")
// hallOneRight.renderRect()

const hallTwoTop = new Drawing (830, 330, 80, 10, "blue")
// hallTwoTop.renderRect()

///Room 2
const roomTwoTop = new Drawing(500, 310, 330, 30, "blue")
// roomTwoTop.renderRect()

const roomTwoLeftWall = new Drawing (410, 350, 10, 180, "blue")
// roomTwoLeftWall.renderRect()

//room 3
const roomThreeTop = new Drawing (150, 350, 260, 10, "blue")
// roomThreeTop.renderRect()

const roomThreeLavaOne = new Drawing(0, 290, 70, 210, "red")
// roomThreeLavaOne.renderRect()

//room 4
const roomFourBottLava = new Drawing(0, 100, 200, 190, "red")
// roomFourBottLava.renderRect()

const roomFourRightLava = new Drawing(260, 000, 50, 240, "red")
// roomFourRightLava.renderRect()

//room 5
const roomFiveLeftWall = new Drawing(330, 0, 10, 200, "blue")
// roomFiveLeftWall.renderRect()

const roomFiveLavaLeft = new Drawing(340, 150, 200, 50, "red")
// roomFiveLavaLeft.renderRect()

//room 5 moving pieces
const FireBallOne = new Drawing(700, 20, 0, 0, "lime", 15)
// FireBallOne.renderCircle()

const FireBallTwo = new Drawing(800, 280, 0, 0, "lime", 15)
// FireBallTwo.renderCircle()

//=====list of all rendered objects in room ===//
function drawRect(rectangle) {
    console.log(' draw Rectfired')
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
  
function drawRoom (drawRectangle) {
        console.log('draw room fired')
        for (i = 0; i < drawRectangle.length; i++) {
            drawRect(drawRectangle[i]);
        } 
    }

drawRoom(drawRectangle)
    
    // console.log(drawRoom)
    // console.log(drawRectangle)
  console.log(roomFiveLavaLeft.x, roomFiveLavaLeft.y, roomFiveLavaLeft.width, roomFiveLavaLeft.height);

//   function clearRectangle (rectangle) {
//     ctx.clearRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
//   }
//   clearRectangle(roomFiveLavaLeft)




///=====pick up artifact/make renders disappear=====//

// addEventListener("keydown", 
    function pickUpArtifact () {
        roomOneLeft.clearRect(0, 0, canvas.width, canvas.height)
}


//====== Handling movement ======///
//creating an empty object for pressedKeys so we can call them in the function below
const pressedKeys = {}
// console.log(pressedKeys)
//creating movement for archaeologist function
    //needs e-event for knowing which key was pressed
function handleMovement () {
    // console.log('handle movement', )
    // console.log(archChar)
    const speed = 5
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
}

let xFireball = 700;
let yFireball = 20;
let yDirection = 5
let radiusFireball = 15; 
function animateFireBallOne () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const FireBallOne = new Drawing(xFireball, yFireball, 0, 0, "lime", radiusFireball);
    FireBallOne.renderCircle();

    // xTwo = xTwo + 5;
    yFireball = yFireball + yDirection;
    handleMovement()
    drawRoom(drawRectangle)
    if(yFireball > (310 - radiusFireball)) {
        yDirection = -1 * yDirection 
    } else if (yFireball < radiusFireball) {
        yDirection = -1 *yDirection
    }

    requestAnimationFrame(animateFireBallOne);
}
animateFireBallOne();




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
setInterval( 
    function gameLoop () {
        ctx.clearRect(0,0, canvas.width, canvas.height)
        handleMovement()
        archChar.renderRect()
        // roomOneTop.renderRect();
        // roomOneLeft.renderRect()
        // hallOneRight.renderRect()
        // hallTwoTop.renderRect()
        // roomTwoTop.renderRect()
        // roomTwoLeftWall.renderRect()
        // roomThreeTop.renderRect()
        // roomThreeLavaOne.renderRect()
        // roomFourBottLava.renderRect()
        // roomFourRightLava.renderRect()
        // roomFiveLeftWall.renderRect()
        // roomFiveLavaLeft.renderRect()
        // FireBallOne.renderCircle()
        // FireBallTwo.renderCircle()
    }, 60)

//Game timer - 2 minutes to complete level, check for win scenario
setInterval (
    function timer () {
        
    }, 120000) //2 minutes 2 * 60 *1000

    //=====countdown from 2 minutes
    let countdown = 120
    let volacanoClockDown = setInterval (
        function timer () {
            console.log('countdown ', countdown)
            console.log(archChar.x, archChar.y)
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
            }
            countdown--
        }, 500)

//=====set timeout for reminding players of volcano
//can set timer within timeout to make text change sizes when there's 10 seconds left