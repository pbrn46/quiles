import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TypedSprite } from "../../lib/sprite"


type BagsState = {
  default: {
    maxItems: number,
    contents: TypedSprite<"item">[]
  }
}

const initialState: BagsState = {
  default: {
    maxItems: 16,
    contents: []
  }
}

const slice = createSlice({
  name: "bags",
  initialState,
  reducers: {
    setBags: (state, action: PayloadAction<BagsState>) => {
      return action.payload
    },
    addBagItem: (state, action: PayloadAction<TypedSprite<"item">>) => {
      state.default.contents.push(action.payload)
    },
    addBagItems: (state, action: PayloadAction<TypedSprite<"item">[]>) => {
      action.payload.forEach(item => {
        state.default.contents.push(item)
      })
    },
    reset: () => {
      return initialState
    },
  }
})

export const bagsReducer = slice.reducer
export const bagsActions = slice.actions