import { spritesSelectors } from "../redux/reducers/sprites"
import { RootState } from "../redux/store"
import { GroupedSprites, SpriteType, TypedSprite } from "./sprite"

type Position = [number, number]

export const posToPx = (state: RootState, pos: number) => {
  return state.config.tileSizePx * pos
}

export const isPassible = (state: RootState, x: number, y: number) => {
  const terrains = spritesSelectors.selectGroupedSprites(state)["terrain"]
  if (x < 0 || x >= state.map.width
    || y < 0 || y >= state.map.height)
    return false
  for (let terrain of terrains) {
    if (terrain.x === x && terrain.y === y) {
      if (!terrain.passible) return false
    }
  }
  return true
}

/**
 * Similar to Array.prototype.map(), but uses (x, y) rather
 * than (value, index) for parameters.
 * callback: (x, y)
 * returns: Object with keys "x_y"
 *  */
export const mapRowCol = <T extends unknown>(width: number, height: number, callback: (x: number, y: number) => T) => {
  const map: Record<string, T> = {}
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      map[`${x}_${y}`] = callback(x, y)
    }
  }
  return map
}

export const getPassibleMap = (state: RootState) => {
  return mapRowCol(state.map.width, state.map.height, (x, y) => {
    return isPassible(state, x, y)
  })
}

export const getNearestMove = (state: RootState, fromX: number, fromY: number, toX: number, toY: number) => {

}

export const inPositions = (x: number, y: number, positions: Position[]): boolean => {
  for (let position of positions) {
    if (x === position[0] && y === position[1]) return true
  }
  return false
}

export const getNeighbourPositions = (x: number, y: number): Position[] => {
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

/** Get neighbour sprites of specific type */
export const getNeighbourSprites = <T extends SpriteType>(state: RootState, x: number, y: number, spriteType: T): GroupedSprites[T] => {
  const groupedSprites = spritesSelectors.selectGroupedSprites(state)
  const neighbourPositions = getNeighbourPositions(x, y)
  const sprites = groupedSprites[spriteType]
  return (sprites as any).filter((sprite: TypedSprite<T>) =>
    inPositions(sprite.x, sprite.y, neighbourPositions)
  )
}

export const getSpritesAt = <T extends SpriteType>(state: RootState, x: number, y: number, spriteType: T): GroupedSprites[T] => {
  const groupedSprites = spritesSelectors.selectGroupedSprites(state)
  const sprites = groupedSprites[spriteType]
  return (sprites as any[]).filter((sprite: TypedSprite<T>) =>
    sprite.x === x && sprite.y === y
  )
}

export const getItemsAt = (state: RootState, xPos: number, yPos: number) => {
  return getSpritesAt(state, xPos, yPos, 'item')
}

export const getItemsNotAt = (state: RootState, xPos: number, yPos: number) => {
  const items = spritesSelectors.selectGroupedSprites(state)["item"]
  return items.filter(item => !(item.x === xPos && item.y === yPos))
}

export const heroShouldDie = (state: RootState) => {
  const hero = spritesSelectors.selectHero(state)
  // If there's a foe adjecent to the hero, die.
  if (getNeighbourSprites(state, hero.x, hero.y, 'foe').length > 0
    || getSpritesAt(state, hero.x, hero.y, 'foe').length > 0
  ) {
    return true
  }
  return false
}

export const heroIsDead = (state: RootState) => {
  const hero = spritesSelectors.selectHero(state)
  return hero.hp === 0
}