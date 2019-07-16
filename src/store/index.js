import React, { useReducer, createContext, useContext } from 'react'


const INITIAL_STATE = {
  sprites: {
    hero: {
      x: 0,
      y: 0,
    }
  },
  map: {
    width: 60,
    height: 50,
    tiles: {},
  },
  config: {
    canvas: {
      width: 800,
      height: 500,
    },
    tiles: {
      width: 32,
      height: 32,
    }
  }
}

var context = createContext(null)

function reducer(state, action) {
  return {
    ...state,
    sprites: spritesReducer(state.sprites, action),
  }
}

function spritesReducer(state, action) {
  return {
    hero: heroReducer(state.hero, action)
  }
}
function heroReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_HERO':
      var updateMerge = { ...action }
      delete updateMerge.type
      return { ...state, ...updateMerge }
    default:
      throw new Error("Invalid action type.")
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
