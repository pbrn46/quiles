import { useMemo } from 'react'
import { useStore } from './'
import { getItemsAt } from '../lib/util'
import * as thisFile from './actions'

export function moveHero(state, dispatch, direction) {
  const hero = state.sprites.hero
  if (hero.hp <= 0) return
  dispatch([
    { type: 'HERO_MOVE', direction },
    { type: 'VIEW_CENTER' }])
}

export function getItems(state, dispatch) {
  const hero = state.sprites.hero
  if (hero.hp <= 0) return
  dispatch({
    type: 'HERO_GET_ITEMS',
    x: hero.x, y: hero.y,
    items: getItemsAt(state, hero.x, hero.y)
  })
}

export function spitItem(state, dispatch) {
  const hero = state.sprites.hero
  if (hero.hp <= 0) return
  dispatch({ type: 'HERO_SPIT_ITEM', x: hero.x, y: hero.y })
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