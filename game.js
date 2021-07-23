import {update as updateSnake, draw as drawSnake, snakeSpeed, getSnakeHead, snakeIntersection } from "./snake.js"
import {update as updateFood, draw as drawFood } from "./food.js"
import { outsideGrid } from "./grid.js"

let lastRenderTime = 0
let gameOver = false
export const gameBoard = document.getElementById("game-board")

function main(currentTime) {
    if (gameOver) {
        if (confirm("You lost! Press Ok to restart")) {
            location.reload()
        }
        return
    }

    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / snakeSpeed) return

    lastRenderTime = currentTime

    update()
    draw()
}

window.requestAnimationFrame(main)

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ""
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}