const start = document.querySelector('#start')
let time = 0
let score = 0
const colors = ['#DB3791', '#ED30F2', '#B02EE8', '#E8472E', '#F2303A', '#BF6D98', '#AB8BC0', '#B180AB']

const timeEl = document.querySelector('#time')

const board = document.querySelector('#board')

const screens = document.querySelectorAll('.screen')
console.log(screens)

start.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

const timeList = document.querySelector('#time-list')
timeList.addEventListener('click', event => {

    if (event.target.classList.contains('time-btn')) {

        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')

        startGame()
    }
})



function startGame() {
    setInterval(derciseTime, 1000)
    createRandomCircle()
    timeEl.innerHTML = `00:${time}`
}

function derciseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        timeEl.innerHTML = `00:${current}`
    }
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Your result: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    let circle = document.createElement('div')
    const size = getRandomNumber(20, 60)

    const { width, height } = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    const color = getRandomColor()
    circle.style.backgroundColor = `${color}`
    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})


