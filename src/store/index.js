import React, { useReducer, createContext, useContext } from 'react'

import { isPassible, getNeighbourSprites } from '../lib/util'

const HERO_TEMPLATE = {
  x: 0,
  y: 0,
  direction: 'left',
  hp: 100,
  hpMax: 100,
  mp: 50,
  mpMax: 50,
  power: 100,
  image: "giraffe"
}
const FOE_TEMPLATE = {
  x: 0,
  y: 0,
  // direction: 'left',
  hp: 100,
  hpmax: 100,
  mp: 50,
  mpmax: 50,
  power: 100,
  image: "lion"
}
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
    hero: HERO_TEMPLATE,
    items: [
      { ...ITEM_TEMPLATE_TREE, x: 5, y: 8, },
      { ...ITEM_TEMPLATE_TREE, x: 5, y: 10, },
      { ...ITEM_TEMPLATE_TREE, x: 2, y: 12, },
      { ...ITEM_TEMPLATE_TREE, x: 3, y: 12, },
      { ...ITEM_TEMPLATE_TREE, x: 4, y: 12, },
    ],
    tiles: [
      { ...TILE_TEMPLATE_ROCK, x: 6, y: 9, },
      { ...TILE_TEMPLATE_ROCK, x: 8, y: 9, },
      { ...TILE_TEMPLATE_ROCK, x: 6, y: 10, },
      { ...TILE_TEMPLATE_ROCK, x: 8, y: 10, },
      { ...TILE_TEMPLATE_ROCK, x: 6, y: 11, },
      { ...TILE_TEMPLATE_ROCK, x: 7, y: 11, },
      { ...TILE_TEMPLATE_ROCK, x: 8, y: 11, },
    ],
    foes: [
      { ...FOE_TEMPLATE, x: 3, y: 2 },
    ]

  },
  map: {
    width: 60,
    height: 50,
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
      let { x, y, hp, direction } = hero
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
      if (hp <= 0) {
        x = hero.x
        y = hero.y
        direction = hero.direction
      }
      if (getNeighbourSprites(state, x, y, 'foes').length > 0) {
        hp = 0
      }
      return { ...hero, x, y, direction, hp }
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
