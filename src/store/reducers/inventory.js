import bagsReducer  from './inventory.bags'

export default function inventoryReducer(inventory, action, state) {
  return {
    ...inventory,
    bags: bagsReducer(inventory.bags, action, state),
  }
}