import React, { useReducer, createContext, useContext } from 'react'

import viewReducer from './reducers/view'
import spritesReducer from './reducers/sprites'
import inventoryReducer from './reducers/inventory'
import { INITIAL_STATE } from './stateTemplates'


var context = createContext(null)

function reducer(state, action) {
  if (Array.isArray(action)) {
    let newState = state
    for (let subAction of action) {
      newState = reducer(newState, subAction)
    }
    return newState
  }
  switch (action.type) {
    case 'RESET_GAME':
      let resetState = {...INITIAL_STATE}
      resetState.view.widthPx = state.view.widthPx
      resetState.view.heightPx = state.view.heightPx
      return resetState
    default:
      break
  }
  return {
    ...state,
    view: viewReducer(state.view, action, state),
    sprites: spritesReducer(state.sprites, action, state),
    inventory: inventoryReducer(state.inventory, action, state),
  }
}

export function StoreProvider({ children }) {
  var [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  return (<context.Provider value={[state, dispatch]}>{children}</context.Provider>)
}

export function useStore() {
  var [state, dispatch] = useContext(context)
  return [state, dispatch]
}
