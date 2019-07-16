import React, { useReducer, createContext, useContext } from 'react'

import { isPassible } from '../lib/util'

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
      },
      {
        ...ITEM_TEMPLATE_TREE,
        x: 2,
        y: 12,
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
    sprites: spritesReducer(state.sprites, action, state),
  }
}

function spritesReducer(sprites, action, state) {
  return {
    ...sprites,
    items: itemsReducer(sprites.items, action, state),
    hero: heroReducer(sprites.hero, action, state)
  }
}
function heroReducer(hero, action, state) {
  switch (action.type) {
    case 'UPDATE_HERO':
      let updateMerge = { ...action }
      delete updateMerge.type
      return { ...hero, ...updateMerge }
    case 'HERO_MOVE':
      let x = hero.x
      let y = hero.y
      let direction = hero.direction
      switch (action.direction) {
        case 'up':
          y--
          break
        case 'down':
          y++
          break
        case 'left':
          x--
          direction = 'left'
          break
        case 'right':
          x++
          direction = 'right'
          break
        default:
      }
      if (!isPassible(state, x, y)) {
        x = hero.x
        y = hero.y
      }
      return { ...hero, x, y, direction }
    case 'HERO_GET_ITEMS':
      let heroAfterItems = { ...hero }
      for (let item of action.items) {
        for (let effect in item.effects) {
          heroAfterItems = {
            ...heroAfterItems,
            [effect]: heroAfterItems[effect] + item.effects[effect]
          }
        }
      }
      return { ...hero, ...heroAfterItems }
    case 'HERO_SPIT_TREE':
      if (action.power < 50) return hero
      return { ...hero, power: hero.power - 50 }
    default:
      return hero
  }
}

function itemsReducer(items, action, state) {
  switch (action.type) {
    case 'HERO_GET_ITEMS':
      return items.filter(item => !(item.x === action.x && item.y === action.y))
    case 'HERO_SPIT_TREE':
      if (state.sprites.hero.power < 50) return items
      return [...items, { ...ITEM_TEMPLATE_TREE, x: state.sprites.hero.x, y: state.sprites.hero.y }]
    default:
      return items
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
