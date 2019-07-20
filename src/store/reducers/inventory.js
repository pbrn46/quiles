import equippedReducer from './inventory.equipped'
import bagsReducer  from './inventory.bags'

export default function inventoryReducer(inventory, action, state) {
  return {
    ...inventory,
    equipped: equippedReducer(inventory.equipped, action, state),
    bags: bagsReducer(inventory.bags, action, state),
  }
}