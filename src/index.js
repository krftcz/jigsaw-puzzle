import { pipe } from './utils/utils.js'
import { makePieces } from './core/make-pieces.js'
import { shuffle } from './core/shuffle.js'
import { activate, deactivate } from './core/activate.js'
import { move } from './core/move.js'
import { snap } from './core/snap.js'
import { status } from './core/status.js'
import { clone } from './utils/utils.js'
import { setStatus } from './core/set-status.js'
import './utils/safariDrawImageFix.js'
import pan, { getTransformedPosition } from './utils/pan.js'
import { makeCanvas, loadImage, paint, resize, setCursor } from './canvas.js'
import { cutPieces } from './utils/create-piece.js'

const createPiecesCanvas = (image, piecesData, numberOfPieces, dpi = 2) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const pieceWidth = image.width / numberOfPieces.x
  const pieceHeight = image.height / numberOfPieces.y

  const extraSpaceNeeded = Math.round(Math.max(pieceWidth, pieceHeight) / 2)

  canvas.width = image.width + numberOfPieces.x * extraSpaceNeeded
  canvas.height = image.height + numberOfPieces.y * extraSpaceNeeded

  const paths = cutPieces(pieceWidth, pieceHeight, piecesData)

  piecesData.forEach((piece) => {
    ctx.save()
    ctx.translate(
      piece.origin.x * (pieceWidth + extraSpaceNeeded) + extraSpaceNeeded / 2,
      piece.origin.y * (pieceHeight + extraSpaceNeeded) + extraSpaceNeeded / 2
    )

    ctx.stroke(paths[piece.id])
    ctx.clip(paths[piece.id])

    ctx.drawImage(
      image,
      piece.origin.x * pieceWidth - extraSpaceNeeded, // what part of image
      piece.origin.y * pieceHeight - extraSpaceNeeded, // what part of image
      (numberOfPieces.x + extraSpaceNeeded * 2) * dpi, // how much of image
      (numberOfPieces.y + extraSpaceNeeded * 2) * dpi, // how much of image
      -extraSpaceNeeded, // where on canvas
      -extraSpaceNeeded, // where on canvas
      (numberOfPieces.x + extraSpaceNeeded * 2) * dpi, // how big on canvas
      (numberOfPieces.y + extraSpaceNeeded * 2) * dpi // how big on canvas
    )

    ctx.restore()
  })

  canvas.style.position = 'fixed'
  canvas.style.top = '20px'
  canvas.style.left = '20px'
  canvas.style.width = '800px'
  canvas.style.border = '1px solid'

  document.body.append(canvas)
}

export const puzzle = async ({
  element,
  image: img = '',
  pieces = { x: 6, y: 4 },
  attraction = 5,
  aligned = true,
  individualize = false,
  zoom: initZoom,
  beforeInit = () => {},
  onInit = () => {},
  onComplete = () => {},
  onChange = () => {},
}) => {
  const container =
    typeof element === 'string' ? document.querySelector(element) : element

  if (!container) {
    console.warn(`Couldn't find element: ${element}`)
    return
  }

  const { canvas, ctx } = makeCanvas(container)

  beforeInit(canvas)

  const image = await loadImage(img)

  const initPuzzle = {
    moves: 0,
    status: 'idle',
    done: false,
    startTime: Date.now(),
    attraction,
    size: pieces,
    pieces: makePieces(pieces, individualize),
  }

  const initUI = {
    url: img,
    zoom: 1,
    position: { x: 0, y: 0 },
    size: { x: image.width, y: image.height },
    canvas,
    ctx,
    piecesCanvas: createPiecesCanvas(image, initPuzzle.pieces, pieces),
    image,
    dpi: Math.min(2, window.devicePixelRatio),
    shapes: cutPieces(
      image.width / pieces.x,
      image.height / pieces.y,
      initPuzzle.pieces
    ),
  }

  let state = {}

  state.puzzle = pipe(shuffle(aligned))(initPuzzle)
  state.ui = paint(state.puzzle)(initUI)

  const { zoom, restore } = pan(canvas, {
    dpi: Math.min(2, window.devicePixelRatio),
    initScale:
      initZoom ||
      Math.min(
        (window.innerWidth / state.ui.size.x) * 0.9,
        (window.innerHeight / state.ui.size.y) * 0.9
      ),
  })

  const updateUI = () => {
    state.ui = pipe(paint(state.puzzle), setCursor(state.puzzle))(state.ui)
  }

  canvas.addEventListener('pan', e => {
    e.preventDefault()
    const {
      detail: { scale, position },
    } = e

    state.ui.zoom = scale
    state.ui.position = position

    state.ui.ctx.setTransform(scale, 0, 0, scale, position.x, position.y)
    updateUI()
  })

  setTimeout(() => onInit(state))

  const getCursor = ({ x, y }) => {
    const [xpos, ypos] = getTransformedPosition({ x, y }, state.ui.dpi)
    return { x: xpos / state.ui.size.x, y: ypos / state.ui.size.y }
  }

  const handlePointerdown = ({ offsetX: x, offsetY: y }) => {
    const cursor = getCursor({ x, y })

    state.puzzle = pipe(activate(cursor), setStatus(cursor))(state.puzzle)

    updateUI()
  }

  const handlePointermove = ({ offsetX: x, offsetY: y }) => {
    const cursor = getCursor({ x, y })

    state.puzzle = pipe(move(cursor), setStatus(cursor))(state.puzzle)

    updateUI()
  }

  const handlePointerup = ({ offsetX: x, offsetY: y }) => {
    const cursor = getCursor({ x, y })

    state.puzzle = pipe(
      snap,
      deactivate,
      status,
      setStatus(cursor)
    )(state.puzzle)

    updateUI()

    onChange({ ui: state.ui, puzzle: clone(state.puzzle) })

    if (state.puzzle.done) onComplete(state)
  }

  const handleResize = () => {
    const { zoom, position } = state.ui
    resize(state.ui.canvas)
    ctx.setTransform(zoom, 0, 0, zoom, position.x, position.y)
    updateUI()
  }

  state.ui.canvas.addEventListener('pointerdown', handlePointerdown)
  state.ui.canvas.addEventListener('pointermove', handlePointermove)
  state.ui.canvas.addEventListener('pointerup', handlePointerup)
  window.addEventListener('resize', handleResize)

  return {
    newGame: () => {
      state.puzzle = pipe(shuffle(aligned))(initPuzzle)
      updateUI()
    },
    getState: () => clone(state.puzzle),
    setState: newState => {
      state.puzzle = newState
      updateUI()
    },
    destroy: () => {
      if (element.tagName !== 'CANVAS') {
        state.ui.canvas.remove()
      }

      state = null
    },
    setZoom: zoom,
    getZoom: () => state.ui.zoom,
    centralize: restore,
  }
}
