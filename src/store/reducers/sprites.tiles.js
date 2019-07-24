export default function tilesReducer(tiles, action, state) {
  switch (action.type) {
    case 'UPDATE_TILES':
      return action.tiles
    case 'ADD_TILES':
      return [...tiles, ...action.tiles]
    default:
      return tiles
  }
}