const canvas = document.getElementById('canvas1')
const controlsform = document.getElementById('main')
const generateButton = document.querySelector('.generate-tree-button')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  generateRandomTree()
})

let fruit = 0

class controls {
  constructor(type, id, min, max, value) {
    this.div = document.createElement('div')
    controlsform.appendChild(this.div)
    this.slider = document.createElement('input')
    if (type == 'range') {
      this.slider.setAttribute('min', min)
      this.slider.setAttribute('max', max)
    }
    this.slider.setAttribute('type', type)
    this.slider.setAttribute('id', id)
    this.slider.setAttribute('value', value)
    this.div.appendChild(this.slider)
    this.label = document.createElement('Label')
    this.label.htmlFor = id
    this.label.innerHTML = id
    this.div.appendChild(this.label)
  }

  get value() {
    return this.slider.value
  }

  get control() {
    return this.slider
  }
}

function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

function drawTree(startX, startY, len, angle, branchWidth, color1, color2, details, curve2, leafsize, blurcolor, fruitcolor) {
  ctx.beginPath()
  ctx.save()
  ctx.strokeStyle = color1
  ctx.fillStyle = color2
  ctx.shadowBlur = 15
  ctx.shadowColor = blurcolor
  ctx.lineWidth = branchWidth
  ctx.translate(startX, startY)
  ctx.rotate(angle * (Math.PI / 180))
  ctx.moveTo(0, 0)
  // ctx.lineTo(0, -len)
  if (angle > 0) {
    ctx.bezierCurveTo(curve2, -len / 2, curve2, -len / 2, 0, -len)
  } else {
    ctx.bezierCurveTo(curve2, -len / 2, -curve2, -len / 2, 0, -len)
  }
  ctx.stroke()

  if (len < details) {
    ctx.beginPath()
    ctx.arc(0, -len, leafsize, 0, Math.PI / 2)
    ctx.fill()
    if (fruit % 20 == 0) {
      ctx.fillStyle = fruitcolor
      ctx.arc(0, -len, leafsize / 2, -Math.PI, Math.PI)
      ctx.fill()
    }
    ctx.restore()
    fruit++
    return
  }
  drawTree(0, -len, len * 0.75, angle + curve, branchWidth * 0.6, color1, color2, details, curve2, leafsize, blurcolor, fruitcolor)
  drawTree(0, -len, len * 0.75, angle - curve, branchWidth * 0.6, color1, color2, details, curve2, leafsize, blurcolor, fruitcolor)

  ctx.restore()
}

function generateRandomTree() {
  controlsform.innerHTML = ''
  let controlarray = []
  let len = new controls('range', 'Length', 20, 200, Math.floor(Math.random() * 100 + 100))
  controlarray.push(len)
  let centerPointX = canvas.width / 2
  let angle = new controls('range', 'Angle', -70, 70, 0)
  controlarray.push(angle)
  let details = new controls('range', 'Leafs', -15, -5, -10)
  controlarray.push(details)
  let branchWidth = new controls('range', 'Branch_Width', 1, 71, Math.random() * 100 + 1)
  controlarray.push(branchWidth)
  let color1 = new controls('color', 'Branch_color', 0, 0, rgbToHex(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)))
  let color2 = new controls('color', 'Leaf_Color', 0, 0, rgbToHex(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)))
  let blurcolor = new controls('color', 'Blur_color', 0, 0, rgbToHex(0, 0, 0))
  let fruitcolor = new controls('color', 'Fruit_color', 0, 0, rgbToHex(255, 0, 0))
  controlarray.push(color1)
  controlarray.push(color2)
  controlarray.push(blurcolor)
  controlarray.push(fruitcolor)
  generateButton.style.background = color1.value
  curve = Math.random() * 20 + 2
  let curve2 = new controls('range', 'Branch_Curve', 0, 80, Math.random() * 50)
  controlarray.push(curve2)
  let leafSize = new controls('range', 'Leaf_Size', 5, 30, Math.random() * 20 + 5)
  controlarray.push(leafSize)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawTree(centerPointX, canvas.height - 80, len.value, angle.value / 2, branchWidth.value, color1.value, color2.value, -details.value, curve2.value, leafSize.value, blurcolor.value, fruitcolor.value)

  controlarray.forEach((con) => {
    con.control.oninput = function () {
      generateButton.style.background = color1.value
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawTree(centerPointX, canvas.height - 80, len.value, angle.value / 2, branchWidth.value, color1.value, color2.value, -details.value, curve2.value, leafSize.value, blurcolor.value, fruitcolor.value)
    }
  })
}

function gen_controls_vals() {
  let centerPointX = canvas.width / 2
}

generateButton.addEventListener('click', generateRandomTree)
generateRandomTree()
