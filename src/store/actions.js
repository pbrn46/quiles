import { useMemo } from 'react'
import { useStore } from './'
import {
  getItemsAt, getItemsNotAt, isPassible, heroShouldDie
} from '../lib/util'
import * as thisFile from './actions'

export function moveHero(state, dispatch, direction) {
  const hero = { ...state.sprites.hero }
  if (hero.hp <= 0) return
  switch (direction) {
    case 'up':
      hero.y--
      break
    case 'down':
      hero.y++
      break
    case 'left':
      hero.x--
      hero.direction = 'left'
      break
    case 'right':
      hero.x++
      hero.direction = 'right'
      break
    default:
      break
  }
  if (!isPassible(state, hero.x, hero.y)) {
    hero.x = state.sprites.hero.x
    hero.y = state.sprites.hero.y
  }
  const foes = state.sprites.foes.map(foe => {
    if (Math.floor(Math.random() * 2) !== 0) return foe
    let dx = hero.x - foe.x
    let dy = hero.y - foe.y
    let rad = Math.atan2(dx, dy)
    let x = Math.round(Math.sin(rad) * 1) + foe.x
    let y = Math.round(Math.cos(rad) * 1) + foe.y
    return { ...foe, x, y }
  })
  dispatch([
    { type: 'UPDATE_HERO', hero },
    { type: 'UPDATE_FOES', foes },
    { type: 'VIEW_CENTER' },
    (state) => {
      if (heroShouldDie(state)) {
        return { type: 'UPDATE_HERO', hero: { ...hero, hp: 0 } }
      }
    }])
}

export function getItems(state, dispatch) {
  const hero = state.sprites.hero
  if (hero.hp <= 0) return
  var remainingItems = getItemsNotAt(state, hero.x, hero.y)
  var items = getItemsAt(state, hero.x, hero.y)
  var bagItems = items.filter(item => !item.slot)
  var equipItems = items.filter(item => item.slot)
  dispatch([{
    type: 'UPDATE_ITEMS',
    items: remainingItems,
  }, {
    type: 'ADD_BAG_ITEMS',
    items: bagItems,
  }, ...equipItems.map(item => ({
    type: 'UPDATE_EQUIPPED_ITEM',
    item: item,
  }))])
}

export function spitItem(state, dispatch) {
  const hero = state.sprites.hero
  if (hero.hp <= 0) return
  var remainingContents = [...state.inventory.bags.default.contents]
  if (remainingContents.length === 0) return
  var item = remainingContents.pop()
  item.x = hero.x
  item.y = hero.y
  var newBags = {
    ...state.inventory.bags,
    default: {
      ...state.inventory.bags.default,
      contents: remainingContents
    }
  }
  var newItems = [...state.sprites.items, item]
  dispatch([{
    type: 'UPDATE_BAGS',
    bags: newBags,
  }, {
    type: 'UPDATE_ITEMS',
    items: newItems,
  }])
}

export default function useActions() {
  var [state, dispatch] = useStore()
  var actions = useMemo(() => (
    Object.keys(thisFile).reduce(
      (acc, key) => {
        acc[key] = (...args) => thisFile[key](state, dispatch, ...args)
        return acc
      }, {})
  ), [state, dispatch])
  return [actions]
}