import { ITEM_TEMPLATE_TREE } from '../stateTemplates'

export default function itemsReducer(items, action, state) {
  switch (action.type) {
    case 'HERO_GET_ITEMS':
      return items.filter(item => !(item.x === action.x && item.y === action.y))
    case 'HERO_SPIT_TREE':
      if (state.sprites.hero.power < 50) return items
      return [...items, { ...ITEM_TEMPLATE_TREE, x: state.sprites.hero.x, y: state.sprites.hero.y }]
    default:
      return items
  }
}