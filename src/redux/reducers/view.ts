import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { posToPx } from '../../lib/util'
import { appThunk } from '../store'
import { spritesSelectors } from './sprites'

type ViewState = {
  widthPx: number
  heightPx: number
  xPx: number
  yPx: number
}

const initialState: ViewState = {
  widthPx: 800,
  heightPx: 500,
  xPx: 0,
  yPx: 0,
}

const slice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<ViewState>) => {
      return action.payload
    },
    setViewXY: (state, action: PayloadAction<{ xPx: number, yPx: number }>) => {
      return {
        ...state,
        ...action.payload,
      }
    },
    setViewWH: (state, action: PayloadAction<{ widthPx: number, heightPx: number }>) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})

const viewCenter = () => appThunk((dispatch, getState) => {
  const state = getState()
  const hero = spritesSelectors.selectHero(state)
  dispatch(slice.actions.setViewXY({
    xPx: posToPx(state, hero.x)
      + Math.floor(state.config.tileSizePx / 2)
      - Math.floor(state.view.widthPx / 2),
    yPx: posToPx(state, hero.y)
      + Math.floor(state.config.tileSizePx / 2)
      - Math.floor(state.view.heightPx / 2),
  }))
})

export const viewReducer = slice.reducer
export const viewActions = {
  ...slice.actions,
  viewCenter,
}