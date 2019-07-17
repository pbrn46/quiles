import { posToPx } from './util'

const drawTiles = (state, ctx) => {
  for (let y = 0; y < state.map.height; y++) {
    for (let x = 0; x < state.map.width; x++) {
      var [xPx, yPx] = posToPx(state, x, y)
      ctx.fillStyle = "#2b5"
      ctx.strokeStyle = "#3ac765"
      ctx.lineWidth = 1
      ctx.fillRect(xPx, yPx, state.config.tiles.width, state.config.tiles.height)
      ctx.strokeRect(xPx, yPx, state.config.tiles.width, state.config.tiles.height)
    }
  }

  for (let tile of state.sprites.tiles) {
    let [xPx, yPx] = posToPx(state, tile.x, tile.y)
    let image = document.getElementById(tile.image)
    ctx.drawImage(image, xPx, yPx, state.config.tiles.width, state.config.tiles.height)
  }
}

const heroFrameCount = 4
const heroTicksPerFrame = 10
var heroTicks = 0
var heroFrameIndex = 0
const drawHero = (state, ctx) => {
  heroTicks++
  let { width, height } = state.config.tiles
  if (heroTicks >= heroTicksPerFrame) {
    heroTicks = 0
    heroFrameIndex++
    if (heroFrameIndex >= heroFrameCount) {
      heroFrameIndex = 0
    }
  }
  const hero = state.sprites.hero
  var [dx, dy] = posToPx(state, hero.x, hero.y)
  var sx = heroFrameIndex * width
  var sy = hero.direction === "left" ? 0 : height
  const image = document.getElementById(state.sprites.hero.image)
  ctx.drawImage(image,
    sx, sy, width, height,
    dx, dy, width, height)
  if (hero.hp <= 0) {
    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.strokeStyle = "#f00"
    ctx.moveTo(dx, dy)
    ctx.lineTo(dx + width, dy + height)

    ctx.moveTo(dx + width, dy)
    ctx.lineTo(dx, dy + height)
    ctx.stroke()
  }
}

const drawItems = (state, ctx) => {
  const items = state.sprites.items
  for (let item of items) {
    var [xPx, yPx] = posToPx(state, item.x, item.y)
    if (item.image) {
      const image = document.getElementById(item.image)
      ctx.drawImage(image, xPx, yPx, state.config.tiles.width, state.config.tiles.height)
    } else {
      ctx.fillStyle = "green"
      ctx.strokeStyle = "#000000"
      ctx.lineWidth = 1
      ctx.fillRect(xPx, yPx, state.config.tiles.width, state.config.tiles.height)
      ctx.strokeRect(xPx, yPx, state.config.tiles.width, state.config.tiles.height)
    }
  }
}

const drawFoes = (state, ctx) => {
  const foes = state.sprites.foes
  for (let foe of foes) {
    var [xPx, yPx] = posToPx(state, foe.x, foe.y)
    if (foe.image) {
      const image = document.getElementById(foe.image)
      ctx.drawImage(image, xPx, yPx, state.config.tiles.width, state.config.tiles.height)
    } else {
      ctx.fillStyle = "green"
      ctx.strokeStyle = "#000000"
      ctx.lineWidth = 1
      ctx.fillRect(xPx, yPx, state.config.tiles.width, state.config.tiles.height)
      ctx.strokeRect(xPx, yPx, state.config.tiles.width, state.config.tiles.height)
    }
  }
}

export const draw = (state, ctx) => {
  if (!ctx) return
  ctx.clearRect(0, 0, state.config.canvas.width, state.config.canvas.height)
  drawTiles(state, ctx)
  drawItems(state, ctx)
  drawFoes(state, ctx)
  drawHero(state, ctx)
}
