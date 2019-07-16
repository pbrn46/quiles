
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