import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { EquipSlot } from "../../lib/equipment"
import { SpriteItem, TypedSprite } from "../../lib/sprite"


type EquippedState = Record<EquipSlot, SpriteItem | null>
const initialState: EquippedState = {
  head: null,
  legs: null,
  arms: null,
  shoulders: null,
  chest: null,
  weapon1: null,
}

const slice = createSlice({
  name: "equipped",
  initialState,
  reducers: {
    setEquipped: (state, action: PayloadAction<EquippedState>) => {
      return action.payload
    },
    equipItems: (state, action: PayloadAction<TypedSprite<"item">[]>) => {
      action.payload.forEach(item => {
        if (!item.slot) {
          console.log("Warning: Tried to equip item without slot.", item)
          return
        }
        state[item.slot] = item
      })
    },
    reset: () => {
      return initialState
    },
  }
})

export const equippedReducer = slice.reducer
export const equippedActions = slice.actions