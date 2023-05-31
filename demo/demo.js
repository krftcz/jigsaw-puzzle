import { puzzle } from './jigsaw-puzzle.esm.mjs'

const $ = selector => document.querySelector(selector)

const solution = $('#solution')
const newGame = $('#new-game')
const saveGame = $('#save-game')
const loadGame = $('#load-game')
// const source = $('#source')
const X = $('#x')
const Y = $('#y')

const images = [
  'https://api.devel.iropnasbavi.cz/storage/2_DSC04241.jpeg'
]

const options = {
  element: '#app',
  image: images[Math.floor((Date.now() / 1000) % images.length)],
  pieces: { x: 10, y: 5 },
  attraction: 5,
  zoom: 0.3,
  aligned: true,
  beforeInit: canvas => {
    // console.log('before init:', canvas)
    canvas.style.opacity = 0
  },
  onInit: state => {
    console.log('on init:', state)
    state.ui.canvas.style.transition = 'opacity 0.2s ease'
    state.ui.canvas.style.opacity = 1
  },
  onChange: state => {
    console.log('on change:', state)
  },
  onComplete: state => {
    console.log('on complete:', state)
  },
}

let image = options.image
X.value = options.pieces.x
Y.value = options.pieces.y

let p = await puzzle(options)

window.puzzle = p

// const tick = () => {
//   if(p.getZoom() >= 0.1) {
//     requestAnimationFrame(tick)
//   }

//   p.setZoom(0.99)
// }
// tick()

newGame.addEventListener('click', async () => p.newGame())

saveGame.addEventListener('click', () => {
  localStorage.setItem('save', JSON.stringify(p.getState()))
})

loadGame.addEventListener('click', () => {
  p.setState(JSON.parse(localStorage.getItem('save')))
})

const refresh = async () => {
  p.destroy()
  p = await puzzle(options)
}

source.addEventListener('change', async e => {
  options.image = solution.src = e.target.value
  refresh()
})

X.addEventListener('change', async e => {
  if (e.target.value < 2) return
  options.pieces.x = parseInt(e.target.value, 0)
  refresh()
})

Y.addEventListener('change', async e => {
  if (e.target.value < 2) return
  options.pieces.y = parseInt(e.target.value, 0)
  refresh()
})

// window.addEventListener('click', p.restorePan)
