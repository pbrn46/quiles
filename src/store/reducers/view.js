import { posToPx } from '../../lib/util'

export default function viewReducer(view, action, state) {
  switch (action.type) {
    case 'VIEW_CENTER':
      return {
        ...view,
        xPx: posToPx(state, state.sprites.hero.x)
          + Math.floor(state.config.tileSizePx / 2)
          - Math.floor(state.view.widthPx / 2),
        yPx: posToPx(state, state.sprites.hero.y)
          + Math.floor(state.config.tileSizePx / 2)
          - Math.floor(state.view.heightPx / 2),
      }
    default:
      return view
  }
}