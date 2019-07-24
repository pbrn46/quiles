import { TILE_TEMPLATE_WALL1 } from "../store/stateTemplates"

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
  const minRoomSize = 3
  const maxRoomSize = 10
  const maxRooms = 10
  const maxTries = 1000

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
    console.log(x, y, width, height)
    for (let tryX = x; tryX < x + width; tryX++) {
      for (let tryY = y; tryY < y + height; tryY++) {
        if (map[tryX][tryY] || x + width >= mapWidth || y + height >= mapHeight) {
          valid = false
          console.log(map[x][y])
          break
        }
      }
      if (!valid) break
    }
    if (valid) {
      for (let tryX = x; tryX < x + width; tryX++) {
        for (let tryY = y; tryY < y + height; tryY++) {
          map[tryX][tryY] = "X"
        }
      }
      rooms++
    } else {
      tries++
    }
  }

  return map
}