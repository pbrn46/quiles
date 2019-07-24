import { TILE_TEMPLATE_WALL1 } from "../store/stateTemplates"

const TILE_TYPES = {
  unset: null,
  wall: 1,
  floor: 2,
}

function getMapArray(width, height) {
  var map = Array(width)
  for (let x = 0; x < width; x++) {
    let mapY = Array(height)
    for (let y = 0; y < height; y++) {
      mapY[y] = null
    }
    map[x] = mapY
  }
  return map
}
export function generateMap(mapWidth, mapHeight) {
  const minRoomSize = 4
  const maxRoomSize = 10
  const maxRooms = 100
  const maxTries = maxRooms * 100

  var map = getMapArray(mapWidth, mapHeight)

  var rooms = 0
  var tries = 0
  var maxX = mapWidth - minRoomSize - 1
  var maxY = mapHeight - minRoomSize - 1
  while (rooms < maxRooms && tries <= maxTries) {
    let x = Math.floor(Math.random() * maxX)
    let y = Math.floor(Math.random() * maxY)
    let width = Math.floor(Math.random() * (maxRoomSize - minRoomSize)) + minRoomSize
    let height = Math.floor(Math.random() * (maxRoomSize - minRoomSize)) + minRoomSize
    let valid = true
    if (x + width > mapWidth
      || y + height > mapHeight) {
      valid = false
    } else {
      for (let tryX = x; tryX < x + width; tryX++) {
        for (let tryY = y; tryY < y + height; tryY++) {
          if (map[tryX][tryY] === TILE_TYPES.floor) {
            valid = false
            break
          }
        }
        if (!valid) break
      }
    }
    if (valid) {
      for (let tryX = x; tryX < x + width; tryX++) {
        for (let tryY = y; tryY < y + height; tryY++) {
          if (tryX === x || tryX === x + width - 1
            || tryY === y || tryY === y + height - 1) {
            map[tryX][tryY] = TILE_TYPES.wall
          }
          else {
            map[tryX][tryY] = TILE_TYPES.floor
          }
        }
      }
      rooms++
    } else {
      tries++
    }
  }

  return map.reduce((acc, col, x) => {
    acc = [...acc, ...col.reduce((acc2, row, y) => {
      if (row === TILE_TYPES.wall) {
        acc2.push({ ...TILE_TEMPLATE_WALL1, x , y})
      }
      return acc2
    }, [])]
    return acc
  }, [])
}