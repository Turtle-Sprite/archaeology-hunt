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
console.log(canvas)
let bottom = document.querySelector('#bottom')
console.log(bottom)
let startBtn = document.querySelector('#start')
let resetBtn = document.querySelector('#reset')

// telling the computer we're rendering context 2D images?
const ctx = canvas.getContext('2d')
console.log(ctx)

//=====Drawing Class====//
//creating the players/game pieces
class Drawing {

    //if I wanted to count lives, I think I'd do it here
    constructor (x, y, width, height, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
    }
    //when calling this class, we'll input the above variables, then render will draw it using Rect
    renderRect () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }        
}

// ===== Draw Character====//
//creates the "archaeologist character"
const archChar = new Drawing(50,50, 25, 25, 'orange')
//calls the character to be drawn
archChar.renderRect()

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


    //======count up to 2 minutes=====//
//every second update clock
// call with start button
//clear when Game Timer runs out or player hits a death trap
//could also use this as GameTimer and use else to log out player win/lose scenario
// let time = 0
// let volacanoClock = setInterval (
//     function timer () {
//         if (time < 10) {
//             volcanoTimer.innerText = `0:0${time}`
//         } else if (time < 60) {
//             volcanoTimer.innerText = `0:${time}`
//         } else if (time >= 60 && time < 70) {
//             volcanoTimer.innerText = `1:0${time - 60}`
//         } else if (time >= 70 && time <= 120){
//                 volcanoTimer.innerText = `1:${time - 60}`
//         }
//         time++
//     }, 500)

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


