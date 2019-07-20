export default function bagsReducer(bags, action, state) {
  switch (action.type) {
    case 'HERO_GET_ITEMS':
      let newItems = action.items.filter(item => !item.slot)
      return { ...bags, default: { ...bags.default, contents: [...bags.default.contents, ...newItems] } }
    case 'HERO_SPIT_ITEM':
      let remainingContents = [...bags.default.contents]
      remainingContents.pop()
      return { ...bags, default: { ...bags.default, contents: remainingContents } }
    default:
      return bags
  }
  // return {
  //   ...bags,
  //   // bags: bagsReducer(bags.bags, action, state),
  //   // items: itemsReducer(bags.items, action, state),
  // }
}