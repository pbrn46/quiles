import { combineReducers } from "@reduxjs/toolkit"
import { configReducer } from "./reducers/config"
import { inventoryReducer } from "./reducers/inventory"
import { mapReducer } from "./reducers/map"
import { spritesReducer } from "./reducers/sprites"
import { viewReducer } from "./reducers/view"

export const rootReducer = combineReducers({
  view: viewReducer,
  sprites: spritesReducer,
  inventory: inventoryReducer,
  config: configReducer,
  map: mapReducer,
})