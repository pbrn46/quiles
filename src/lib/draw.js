import { posToPx } from './util'

const drawTiles = (state, ctx) => {
  const tileSize = state.config.tileSizePx
  for (let y = 0; y < state.map.height; y++) {
    for (let x = 0; x < state.map.width; x++) {
      let xPx = posToPx(state, x)
      let yPx = posToPx(state, y)
      ctx.fillStyle = "#2b5"
      ctx.strokeStyle = "#3ac765"
      ctx.lineWidth = 1
      ctx.fillRect(xPx, yPx, tileSize, tileSize)
      ctx.strokeRect(xPx, yPx, tileSize, tileSize)
    }
  }

  for (let tile of state.sprites.tiles) {
    let xPx = posToPx(state, tile.x)
    let yPx = posToPx(state, tile.y)
    let image = document.getElementById(tile.image)
    ctx.drawImage(image, xPx, yPx, tileSize, tileSize)
  }
}

const heroFrameCount = 4
const heroTicksPerFrame = 10
var heroTicks = 0
var heroFrameIndex = 0
const drawHero = (state, ctx) => {
  heroTicks++
  const tileSize = state.config.tileSizePx
  if (heroTicks >= heroTicksPerFrame) {
    heroTicks = 0
    heroFrameIndex++
    if (heroFrameIndex >= heroFrameCount) {
      heroFrameIndex = 0
    }
  }
  const hero = state.sprites.hero
  let dx = posToPx(state, hero.x)
  let dy = posToPx(state, hero.y)
  var sx = heroFrameIndex * tileSize
  var sy = hero.direction === "left" ? 0 : tileSize
  const image = document.getElementById(state.sprites.hero.image)
  ctx.drawImage(image,
    sx, sy, tileSize, tileSize,
    dx, dy, tileSize, tileSize)
  if (hero.hp <= 0) {
    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.strokeStyle = "#f00"
    ctx.moveTo(dx, dy)
    ctx.lineTo(dx + tileSize, dy + tileSize)

    ctx.moveTo(dx + tileSize, dy)
    ctx.lineTo(dx, dy + tileSize)
    ctx.stroke()
  }
}

const drawItems = (state, ctx) => {
  const items = state.sprites.items
  const tileSize = state.config.tileSizePx
  for (let item of items) {
    let xPx = posToPx(state, item.x)
    let yPx = posToPx(state, item.y)
    if (item.image) {
      const image = document.getElementById(item.image)
      ctx.drawImage(image, xPx, yPx, tileSize, tileSize)
    } else {
      ctx.fillStyle = "green"
      ctx.strokeStyle = "#000000"
      ctx.lineWidth = 1
      ctx.fillRect(xPx, yPx, tileSize, tileSize)
      ctx.strokeRect(xPx, yPx, tileSize, tileSize)
    }
  }
}

const drawFoes = (state, ctx) => {
  const foes = state.sprites.foes
  const tileSize = state.config.tileSizePx
  for (let foe of foes) {
    let xPx = posToPx(state, foe.x)
    let yPx = posToPx(state, foe.y)
    if (foe.image) {
      const image = document.getElementById(foe.image)
      ctx.drawImage(image, xPx, yPx, tileSize, tileSize)
    } else {
      ctx.fillStyle = "green"
      ctx.strokeStyle = "#000000"
      ctx.lineWidth = 1
      ctx.fillRect(xPx, yPx, tileSize, tileSize)
      ctx.strokeRect(xPx, yPx, tileSize, tileSize)
    }
  }
}

export const draw = (state, ctx) => {
  if (!ctx) return
  ctx.clearRect(0, 0, state.view.widthPx, state.view.heightPx)
  drawTiles(state, ctx)
  drawItems(state, ctx)
  drawFoes(state, ctx)
  drawHero(state, ctx)
}
