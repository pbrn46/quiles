const posXToPx = (state, xPos) => {
  return state.config.tiles.width * xPos
}

const posYToPx = (state, yPos) => {
  return state.config.tiles.height * yPos
}

const posToPx = (state, xPos, yPos) => {
  return [posXToPx(state, xPos), posYToPx(state, yPos)]
}

const drawTiles = (state, ctx) => {
  for (let y = 0; y < state.map.height; y++) {
    for (let x = 0; x < state.map.width; x++) {
      var [xPx, yPx] = posToPx(state, x, y)
      ctx.fillStyle = "#fff"
      ctx.strokeStyle = "#f5f5f5"
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

const drawHero = (state, ctx) => {
  const hero = state.sprites.hero
  var [xPx, yPx] = posToPx(state, hero.x, hero.y)
  const image = document.getElementById(state.sprites.hero.image)
  if (hero.direction === 'right') {
    ctx.scale(-1, 1)
    ctx.drawImage(image, xPx * -1, yPx, state.config.tiles.width * -1, state.config.tiles.height)
    ctx.scale(-1, 1)
  }
  else {

    ctx.drawImage(image, xPx, yPx, state.config.tiles.width, state.config.tiles.height)
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

export const draw = (state, ctx) => {
  if (!ctx) return
  ctx.clearRect(0, 0, state.config.canvas.width, state.config.canvas.height)
  drawTiles(state, ctx)
  drawItems(state, ctx)
  drawHero(state, ctx)
}
