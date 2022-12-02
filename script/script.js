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
let mainHeight= main.clientHeight
let mainWidth = main.clientWidth
canvas.setAttribute('height', getComputedStyle(canvas)['height'])
canvas.setAttribute('width', getComputedStyle(canvas)['width'])
console.log (mainHeight, " ", mainWidth)

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
        ctx.strokeStlye = "blue"
        ctx.stroke()
    }
}

const artifactDraw = new Drawing(100, 100, 0, 0, "lime", 30)
artifactDraw.renderCircle()
// ===== Draw Character====//
//creates the "archaeologist character"
const archChar = new Drawing(285,120, 15, 15, 'orange')
//calls the character to be drawn
archChar.renderRect()


//----Draw a Game room and contain all elements in an array, object or function?
const roomOne = new Drawing(200, 110, 100, 5, 'blue')
roomOne.renderRect()

const artifactOne = new Drawing(200, 145, 5, 5, 'grey')
artifactOne.renderRect()

///=====pick up artifact/make renders disappear=====//

addEventListener("keydown", 
    function pickUpArtifact () {

})

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
    roomOne.renderRect()
    artifactOne.renderRect()
    artifactDraw.renderCircle()
}

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