
export default function equippedReducer(equipped, action, state) {
  switch (action.type) {
    case 'UPDATE_EQUIPPED_ITEM':
      let newEquipped = { ...equipped }
      newEquipped[action.item.slot] = action.item
      return newEquipped
    default:
      return equipped
  }
}