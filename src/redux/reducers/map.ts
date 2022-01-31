import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type MapState = {
  width: number
  height: number
}

const initialState: MapState = {
  width: 30,
  height: 20,
}

const slice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMap: (state, action: PayloadAction) => {
      return action.payload
    },
  }
})

export const mapReducer = slice.reducer
export const mapActions = slice.actions