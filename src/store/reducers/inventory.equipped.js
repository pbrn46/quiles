
export default function equippedReducer(equipped, action, state) {
  switch (action.type) {
    case 'HERO_GET_ITEMS':
      let newEquipped = {...equipped}
      for (let item of action.items) {
        if (item.slot === 'weapon1')
        newEquipped.weapon1 = item
      }
      return newEquipped
    default:
      return equipped
  }
}