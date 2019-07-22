

export default function heroReducer(hero, action, state) {
  switch (action.type) {
    case 'UPDATE_HERO':
      return action.hero
    default:
      return hero
  }
}