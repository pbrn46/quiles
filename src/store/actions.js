import { useMemo } from 'react'
import { useStore } from './'
import {
  getItemsAt, getItemsNotAt, isPassible, getNeighbourSprites
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
  if (getNeighbourSprites(state, hero.x, hero.y, 'foes').length > 0) {
    hero.hp = 0
  }
  dispatch([
    { type: 'UPDATE_HERO', hero },
    { type: 'VIEW_CENTER' }])
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