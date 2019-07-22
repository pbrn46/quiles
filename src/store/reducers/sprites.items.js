export default function itemsReducer(items, action, state) {
  switch (action.type) {
    case 'UPDATE_ITEMS':
      return action.items
    case 'ADD_ITEMS':
      return [...items, ...action.items]
    default:
      return items
  }
}