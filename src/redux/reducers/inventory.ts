import { combineReducers } from '@reduxjs/toolkit'
import { equippedReducer } from './inventory.equipped'
import { bagsReducer } from './inventory.bags'

export const inventoryReducer = combineReducers({
  equipped: equippedReducer,
  bags: bagsReducer,
})