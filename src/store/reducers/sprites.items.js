export default function itemsReducer(items, action, state) {
  switch (action.type) {
    case 'HERO_GET_ITEMS':
      return items.filter(item => !(item.x === action.x && item.y === action.y))
    case 'HERO_SPIT_ITEM':
      let bag = state.inventory.bags.default
      if (bag.contents.length > 0) {
        let spitItem = bag.contents[bag.contents.length - 1]
        return [...items, { ...spitItem, x: state.sprites.hero.x, y: state.sprites.hero.y }]
      }
      return items
    default:
      return items
  }
}