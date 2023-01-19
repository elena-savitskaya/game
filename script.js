const start = document.querySelector('#start')
let time = 0
let score = 0
const colors = ['#DB3791', '#ED30F2', '#B02EE8', '#E8472E', '#F2303A', '#BF6D98', '#AB8BC0', '#B180AB']

// получим блок таймера
const timeEl = document.querySelector('#time')

// получаю доску, куда помещаю кружек
const board = document.querySelector('#board')

// экранов несколько, поэтому получаю их все
const screens = document.querySelectorAll('.screen')
console.log(screens)

// нажимаю на кнопку старт, меняю класс и переезжаю на новый экран
start.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

// чтобы не добавлять слушатель для каждой из кнопок, добвлю один для time-list
const timeList = document.querySelector('#time-list')
timeList.addEventListener('click', event => {

    // если у элемента есть класс time-btn
    if (event.target.classList.contains('time-btn')) {

        // для того чтобы определять какая именнто кнопка кликнута добавлю дата-атрибут и получу его
        // для получения числа использую фунцию parseInt
        console.log(parseInt(event.target.getAttribute('data-time')))

        // все что получаю записываю в переменную time
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')

        // после выбора времени можно начать игру. запускаю функцию startGame
        startGame()
    }
})



function startGame() {
    setInterval(derciseTime, 1000)
    createRandomCircle()
    timeEl.innerHTML = `00:${time}`
}

// функция таймера
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

// этот метод я вызываю при старте игры
// функция по созданию кружков
// создаю переменную circle, добавляю класс и помещаю в борд
function createRandomCircle() {
    let circle = document.createElement('div')
    const size = getRandomNumber(10, 60)

    // coздаю переменные, чтобы менять положение кружка на странице
    // но сначала получу размер поля
    const { width, height } = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    circle.classList.add('circle')
    // размер круга задаем при помощи полученного size из функции случайных размеров getRandomNumber
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    const color = getRandomColor()
    circle.style.backgroundColor = `${color}`
    board.append(circle)
}

// чтобы размер кружка был случайным создаю еще одну функцию
function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}

// теперь нужно обработать клик по кружку, при клике удаляем круг и созадем новый
// а также веду подсчет 
board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})


