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

const archChar = new Drawing(50,50, 25, 25, 'orange')
archChar.renderRect()

