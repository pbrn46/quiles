import heroReducer  from './sprites.hero'
import itemsReducer from './sprites.items'
import foesReducer from './sprites.foes'

export default function spritesReducer(sprites, action, state) {
  return {
    ...sprites,
    hero: heroReducer(sprites.hero, action, state),
    items: itemsReducer(sprites.items, action, state),
    foes: foesReducer(sprites.foes, action, state),
  }
}