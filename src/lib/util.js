
export const posToPx = (state, pos) => {
  return state.config.tileSizePx * pos
}

export const isPassible = (state, x, y) => {
  if (x < 0 || x >= state.map.width
    || y < 0 || y >= state.map.height)
    return false
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

export const getSpritesAt = (state, x, y, spriteType) => {
  return state.sprites[spriteType].filter(sprite => (
    sprite.x === x && sprite.y === y
  ))
}

export const getItemsAt = (state, xPos, yPos) => {
  return getSpritesAt(state, xPos, yPos, 'items')
}

export const getItemsNotAt = (state, xPos, yPos) => {
  return state.sprites.items.filter(item => !(item.x === xPos && item.y === yPos))
}

export const heroShouldDie = (state) => {
  let hero = state.sprites.hero
  if (getNeighbourSprites(state, hero.x, hero.y, 'foes').length > 0
    || getSpritesAt(state, hero.x, hero.y, 'foes').length > 0
  ) {
    return true
  }
  return false
}