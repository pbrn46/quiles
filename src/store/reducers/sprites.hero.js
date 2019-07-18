import { isPassible, getNeighbourSprites } from '../../lib/util'


export default function heroReducer(hero, action, state) {
  switch (action.type) {
    case 'UPDATE_HERO':
      let updateMerge = { ...action }
      delete updateMerge.type
      return { ...hero, ...updateMerge }
    case 'HERO_MOVE':
      let { x, y, hp, direction } = hero
      switch (action.direction) {
        case 'up':
          y--
          break
        case 'down':
          y++
          break
        case 'left':
          x--
          direction = 'left'
          break
        case 'right':
          x++
          direction = 'right'
          break
        default:
      }
      if (!isPassible(state, x, y)) {
        x = hero.x
        y = hero.y
      }
      if (getNeighbourSprites(state, x, y, 'foes').length > 0) {
        hp = 0
      }
      return { ...hero, x, y, direction, hp }
    case 'HERO_GET_ITEMS':
      let heroAfterItems = { ...hero }
      for (let item of action.items) {
        for (let effect in item.effects) {
          heroAfterItems = {
            ...heroAfterItems,
            [effect]: heroAfterItems[effect] + item.effects[effect]
          }
        }
      }
      return { ...hero, ...heroAfterItems }
    case 'HERO_SPIT_TREE':
      if (action.power < 50) return hero
      return { ...hero, power: hero.power - 50 }
    default:
      return hero
  }
}