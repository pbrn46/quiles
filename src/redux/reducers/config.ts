import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type ConfigState = {
  tileSizePx: number
}
const initialState: ConfigState = {
  tileSizePx: 32
}

const slice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setConfig: (state, action: PayloadAction) => {
      return action.payload
    },
  }
})

export const configReducer = slice.reducer
export const configActions = slice.actions