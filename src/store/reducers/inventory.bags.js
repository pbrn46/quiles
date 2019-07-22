export default function bagsReducer(bags, action, state) {
  switch (action.type) {
    case 'ADD_BAG_ITEMS':
      return { ...bags, default: { ...bags.default, contents: [...bags.default.contents, ...action.items] } }
    case 'UPDATE_BAGS':
      return action.bags
    default:
      return bags
  }
}