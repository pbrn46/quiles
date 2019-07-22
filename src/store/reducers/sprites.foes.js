export default function foesReducer(foes, action, state) {
  switch (action.type) {
    case 'UPDATE_FOES':
      return action.foes
    default:
      return foes
  }
}