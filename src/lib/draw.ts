import { posToPx } from './util'
import * as images from './images'
import { spritesSelectors } from '../redux/reducers/sprites'
import { RootState } from '../redux/store'
import { Direction } from './sprite'

const drawBg = (state: RootState, ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = "#ddd"
  ctx.fillRect(0, 0, state.view.widthPx, state.view.heightPx)
}
const drawTiles = (state: RootState, ctx: CanvasRenderingContext2D) => {
  const groupedSprites = spritesSelectors.selectGroupedSprites(state)

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

  const terrains = groupedSprites["terrain"]
  for (let terrain of terrains) {
    let xPx = posToPx(state, terrain.x) - state.view.xPx
    let yPx = posToPx(state, terrain.y) - state.view.yPx
    let image = images.sprites[terrain.image].image
    ctx.drawImage(image, xPx, yPx, tileSize, tileSize)
  }
}

const drawGun = (state: RootState, ctx: CanvasRenderingContext2D) => {
  const hero = spritesSelectors.selectHero(state)
  let image = images.sprites['gunEquipped'].image
  const tileSize = state.config.tileSizePx
  const dx = posToPx(state, hero.x) - state.view.xPx
  const dy = posToPx(state, hero.y) - state.view.yPx
  const sx = 0
  const sy = hero.direction === Direction.Left ? 0 : tileSize
  ctx.drawImage(image,
    sx, sy, tileSize, tileSize,
    dx, dy, tileSize, tileSize)
}

const heroFrameCount = 4
const heroTicksPerFrame = 10
let heroTicks = 0
let heroFrameIndex = 0
const drawHero = (state: RootState, ctx: CanvasRenderingContext2D) => {
  heroTicks++
  const tileSize = state.config.tileSizePx
  if (heroTicks >= heroTicksPerFrame) {
    heroTicks = 0
    heroFrameIndex++
    if (heroFrameIndex >= heroFrameCount) {
      heroFrameIndex = 0
    }
  }
  const hero = spritesSelectors.selectHero(state)
  if (hero.hp === 0) heroFrameIndex = 0
  const dx = posToPx(state, hero.x) - state.view.xPx
  const dy = posToPx(state, hero.y) - state.view.yPx
  const sx = heroFrameIndex * tileSize
  const sy = hero.direction === Direction.Left ? 0 : tileSize
  const image = images.sprites[hero.image].image
  ctx.drawImage(image,
    sx, sy, tileSize, tileSize,
    dx, dy, tileSize, tileSize)
  if (state.inventory.equipped.weapon1
    && state.inventory.equipped.weapon1.itemType === 'gun') {
    drawGun(state, ctx)
  }
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

const drawItems = (state: RootState, ctx: CanvasRenderingContext2D) => {
  const groupedSprites = spritesSelectors.selectGroupedSprites(state)
  const items = groupedSprites["item"]
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

const drawFoes = (state: RootState, ctx: CanvasRenderingContext2D) => {
  const groupedSprites = spritesSelectors.selectGroupedSprites(state)
  const foes = groupedSprites["foe"]
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

export const draw = (state: RootState, ctx: CanvasRenderingContext2D) => {
  if (!ctx) return
  ctx.clearRect(0, 0, state.view.widthPx, state.view.heightPx)
  drawBg(state, ctx)
  drawTiles(state, ctx)
  drawItems(state, ctx)
  drawFoes(state, ctx)
  drawHero(state, ctx)
}
