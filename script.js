const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let particlesArray = []
window.addEventListener('resize', function () {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  particlesArray = []
  init()
})

const mouse = {
  x: undefined,
  y: undefined,
}

canvas.addEventListener('click', function (event) {
  mouse.x = event.x
  mouse.y = event.y
})

canvas.addEventListener('mousemove', function (event) {
  mouse.x = event.x
  mouse.y = event.y
})

class Particle {
  constructor(x, y) {
    //this.x = mouse.x
    //this.y = mouse.y
    this.x = (x * canvas.width) / 4 + canvas.width / 2
    this.y = (y * canvas.width) / 4 + canvas.height / 2
    this.size = Math.random() * 5 + 1
    this.speedX = Math.random() * 3 - 1.5
    this.speedY = Math.random() * 3 - 1.5
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY
  }
  draw() {
    ctx.fillStyle = 'red'
    ctx.beginPath()
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2)
    ctx.fill()
  }
}

let numPoints = 1000
let turnFraction = 1.6180339887498948482045868343656381177203091798057628621354486227052604628189024497072072041893911374
function init() {
  particlesArray = []
  for (let i = 0; i < numPoints; i++) {
    let dst = Math.pow(i / numPoints, 0.5)
    //let dst = i / numPoints
    let angle = 2 * Math.PI * turnFraction * i
    let x = dst * Math.cos(angle)
    let y = dst * Math.sin(angle)
    particlesArray.push(new Particle(x, y))
  }
  handleParticles()
  if (turnFraction < 1.618033) {
    turnFraction = turnFraction + 0.00001
  }
}

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    //particlesArray[i].update()
    particlesArray[i].draw()
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  init()
  requestAnimationFrame(animate)
}

animate()
