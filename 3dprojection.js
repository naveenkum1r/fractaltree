//Resize

const canvas = document.getElementById('canvas1')
const controlsform = document.getElementById('main')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let hue = 0

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

//input handles
class controls {
  constructor() {
    this.slider = document.createElement('input')
    this.slider.setAttribute('type', 'range')
    this.slider.setAttribute('min', '1')
    this.slider.setAttribute('max', '100')
    this.slider.setAttribute('value', '10')
    controlsform.appendChild(this.slider)
  }

  get control() {
    return this.slider
  }
}

//3d draw
let width = canvas.width
let height = canvas.height
let perspective_control = new controls()
let PERSPECTIVE = (width * perspective_control.control.value) / 100
perspective_control.control.oninput = function () {
  PERSPECTIVE = (width * perspective_control.control.value) / 100
}
let PROJECTION_CENTER_X = width / 2 //center of x direction
let PROJECTION_CENTER_Y = height / 2 //center of y direction
const dots = []

class Particle {
  constructor() {
    this.x = (Math.random() - 0.5) * width // Give a random x position
    this.y = (Math.random() - 0.5) * height // Give a random y position
    this.z = Math.random() * width // Give a random z position
    this.radius = 5 // Size of our element in the 3D world

    this.xProjected = 0 // x coordinate on the 2D world
    this.yProjected = 0 // y coordinate on the 2D world
    this.scaleProjected = 0 // Scale of the element on the 2D world (further = smaller)
    this.color = 'hsl(' + hue + ',100%, 50%)'
  }
  project() {
    // The scaleProjected will store the scale of the element based on its distance from the 'camera'
    this.scaleProjected = PERSPECTIVE / (PERSPECTIVE + this.z)
    // The xProjected is the x position on the 2D world
    this.xProjected = this.x * this.scaleProjected + PROJECTION_CENTER_X
    // The yProjected is the y position on the 2D world
    this.yProjected = this.y * this.scaleProjected + PROJECTION_CENTER_Y
  }
  draw() {
    // We first calculate the projected values of our dot
    this.project()
    // We define the opacity of our element based on its distance
    ctx.globalAlpha = Math.abs(1 - this.z / width)
    // We draw a rectangle based on the projected coordinates and scale
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.xProjected - this.radius, this.yProjected - this.radius, this.radius * 2 * this.scaleProjected, 0, Math.PI * 2)
    ctx.fill()
  }
}

function generate_particle() {
  for (let i = 0; i < 100; i++) {
    // Create a new dot and push it into the array
    dots.push(new Particle())
    hue += 5
  }
}

function render() {
  // Clear the scene from top left to bottom right
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  // Loop through the dots array and draw every dot
  for (var i = 0; i < dots.length; i++) {
    dots[i].draw()
  }
  window.requestAnimationFrame(render)
}

function init() {
  generate_particle()
  render()
}
init()
