
export const posXToPx = (state, xPos) => {
  return state.config.tiles.width * xPos
}

export const posYToPx = (state, yPos) => {
  return state.config.tiles.height * yPos
}

export const posToPx = (state, xPos, yPos) => {
  return [posXToPx(state, xPos), posYToPx(state, yPos)]
}

export const isPassible = (state, x, y) => {
  for (let tile of state.sprites.tiles) {
    if (tile.x === x && tile.y === y) {
      if (!tile.passible) return false
    }
  }
  return true
}

export const inPositions = (x, y, positions) => {
  for (let position of positions) {
    if (x === position[0] && y === position[1]) return true
  }
  return false
}

export const getNeighbourPositions = (x, y) => {
  return [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
    [x, y + 1],
    [x - 1, y + 1],
    [x - 1, y],
  ]
}

export const getNeighbourSprites = (state, x, y, spriteType) => {
  var neighbourPositions = getNeighbourPositions(x, y)
  return state.sprites[spriteType].filter(sprite => (
    inPositions(sprite.x, sprite.y, neighbourPositions)
  ))
}