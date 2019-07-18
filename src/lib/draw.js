import { posToPx } from './util'
import * as images from './images'

const drawBg = (state, ctx) => {
  ctx.fillStyle = "#ddd"
  ctx.fillRect(0, 0, state.view.widthPx, state.view.heightPx)
}
const drawTiles = (state, ctx) => {
  const tileSize = state.config.tileSizePx
  for (let y = 0; y < state.map.height; y++) {
    for (let x = 0; x < state.map.width; x++) {
      let xPx = posToPx(state, x) - state.view.xPx
      let yPx = posToPx(state, y) - state.view.yPx
      ctx.fillStyle = "#2b5"
      ctx.strokeStyle = "#3ac765"
      ctx.lineWidth = 1
      ctx.fillRect(xPx, yPx, tileSize, tileSize)
      ctx.strokeRect(xPx, yPx, tileSize, tileSize)
    }
  }

  for (let tile of state.sprites.tiles) {
    let xPx = posToPx(state, tile.x) - state.view.xPx
    let yPx = posToPx(state, tile.y) - state.view.yPx
    let image = images.sprites[tile.image].image
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
  var dx = posToPx(state, hero.x) - state.view.xPx
  var dy = posToPx(state, hero.y) - state.view.yPx
  var sx = heroFrameIndex * tileSize
  var sy = hero.direction === "left" ? 0 : tileSize
  var image = images.sprites[hero.image].image
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
    let xPx = posToPx(state, item.x) - state.view.xPx
    let yPx = posToPx(state, item.y) - state.view.yPx
    if (item.image) {
      let image = images.sprites[item.image].image
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
    let xPx = posToPx(state, foe.x) - state.view.xPx
    let yPx = posToPx(state, foe.y) - state.view.yPx
    if (foe.image) {
      let image = images.sprites[foe.image].image
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
  drawBg(state, ctx)
  drawTiles(state, ctx)
  drawItems(state, ctx)
  drawFoes(state, ctx)
  drawHero(state, ctx)
}
