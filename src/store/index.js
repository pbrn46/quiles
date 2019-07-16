import React, { useReducer, createContext, useContext } from 'react'

const ITEM_TEMPLATE_TREE = {
  itemType: "powerBoost",
  effects: { power: 50 },
  image: 'tree',
}
const TILE_TEMPLATE_ROCK = {
  name: 'rock',
  image: 'rock',
  passible: false,
}

const INITIAL_STATE = {
  sprites: {
    hero: {
      x: 0,
      y: 0,
      direction: 'left',
      hp: 100,
      maxHp: 100,
      mp: 50,
      maxMp: 50,
      power: 0,
      image: "giraffe"
    },
    items: [
      {
        ...ITEM_TEMPLATE_TREE,
        x: 5,
        y: 8,
      },
      {
        ...ITEM_TEMPLATE_TREE,
        x: 5,
        y: 10,
        itemType: "powerBoost",
        effects: { power: 50 },
        image: 'tree',
      },
      {
        ...ITEM_TEMPLATE_TREE,
        x: 2,
        y: 12,
        itemType: "powerBoost",
        effects: { power: 50 },
        image: 'tree',
      },
    ],
    tiles: [
      {
        ...TILE_TEMPLATE_ROCK,
        x: 6,
        y: 9,
      }
    ]
  },
  map: {
    width: 60,
    height: 50,
    // tiles: {},
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
    ...state,
    items: itemsReducer(state.items, action),
    hero: heroReducer(state.hero, action)
  }
}
function heroReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_HERO':
      var updateMerge = { ...action }
      delete updateMerge.type
      return { ...state, ...updateMerge }
    case 'HERO_GET_ITEMS':
      let heroAfterItems = { ...state }
      for (let item of action.items) {
        for (let effect in item.effects) {
          heroAfterItems = {
            ...heroAfterItems,
            [effect]: heroAfterItems[effect] + item.effects[effect]
          }
        }
      }
      return { ...state, ...heroAfterItems }
    default:
      return state
  }
}

function itemsReducer(state, action) {
  switch (action.type) {
    case 'HERO_GET_ITEMS':
      return state.filter(item => !(item.x === action.x && item.y === action.y))
    case 'HERO_SPIT_TREE':
      return [...state, { ...ITEM_TEMPLATE_TREE, x: action.x, y: action.y }]
    default:
      return state
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
